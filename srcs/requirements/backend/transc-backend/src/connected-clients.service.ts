import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { GameEntity } from './game/entity/game.entity';
import { PrismaService } from 'prisma/prisma.service';

export const connectedClients: Map<string, string> = new Map();

@Injectable()
export class ConnectedClientsService {

    private connectedClientsInChat: Map<string, string> = new Map();
    private gameMap = new Map<String, GameEntity>();

    constructor(private prisma : PrismaService) {}
    
    addClient(client: Socket) {
        const userId = client.handshake.auth.userId as string;
        console.log(`Socket ID: ${client.id}, User: ${userId} is connected on app gateway`);
        if (userId && client.id){
            if(!connectedClients.has(client.id))
            {
                connectedClients.set(client.id, userId);
            }
        }
    }

    isUserConnected(client: Socket): boolean {
        return connectedClients.has(client.id);
    }
    
    getAllClients(): Map<string, string> {
        return connectedClients;
    }
    
    removeClient(client: Socket) {
        connectedClients.delete(client.id);
    }
    
    addClientInchat(client: Socket) {
        const userId = client.handshake.auth.userId as string;
        console.log(`Socket ID: ${client.id}, User: ${userId} is connected on Chat gateway`);
        if (userId && client.id){
            if(!this.connectedClientsInChat.has(client.id))
            {
                this.connectedClientsInChat.set(client.id, userId);
            }
        }
    }
    
    getAllClientsFromChat(): Map<string, string> {
        return this.connectedClientsInChat;
    }
    
    removeClientFromChat(client: Socket) {
        this.connectedClientsInChat.delete(client.id);
    }

}
