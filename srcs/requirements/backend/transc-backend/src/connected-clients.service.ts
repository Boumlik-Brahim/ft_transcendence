import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class ConnectedClientsService {

    private connectedClients: Map<string, string> = new Map();

    addClient(client: Socket) {
        const userId = client.handshake.auth.userId as string;
        if (userId && client.id){
            if(!this.connectedClients.has(client.id))
            {
                this.connectedClients.set(client.id, userId);
            }
        }
        // this.connectedClients.forEach((value, key) => {
        //     console.log(`Socket ID: ${key}, User: ${value}`);
        // });
    }
    
    isUserConnected(client: Socket): boolean {
        return this.connectedClients.has(client.id);
    }
    
    getAllClients(): Map<string, string> {
        return this.connectedClients;
    }
    
    removeClient(client: Socket) {
        this.connectedClients.delete(client.id);
        // this.connectedClients.forEach((value, key) => {
        //     console.log(`User: ${key}, Socket ID: ${value}`);
        // });
    }
}
