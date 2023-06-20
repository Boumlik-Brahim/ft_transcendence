@Injectable()
export class AuthService {
  // Other methods and dependencies

  async signupWith42(code: string): Promise<User> {
    // Make a POST request to the 42 API's token endpoint to exchange the authorization code for an access token
    const tokenEndpoint = 'https://api.intra.42.fr/oauth/token';
    const clientId = this.configService.get('42.clientId');
    const clientSecret = this.configService.get('42.clientSecret');
    const redirectUri = this.configService.get('42.redirectUri');

    const response = await this.http
      .post(tokenEndpoint, {
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
      })
      .toPromise();

    const accessToken = response.access_token;

    // Use the access token to make a GET request to the 42 API's /me endpoint to retrieve user information
    const meEndpoint = 'https://api.intra.42.fr/v2/me';

    const userResponse = await this.http
      .get(meEndpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .toPromise();

    // Process the user data and create or update the user in your application's database
    const user = this.processUserResponse(userResponse);

    // Return the created or updated user
    return user;
  }

  private processUserResponse(response: any): User {
    // Extract relevant user information from the response and create or update the user in your database
    // You may need to map or transform the data to fit your User model or schema

    // Example:
    const user: User = {
      id: response.id,
      username: response.login,
      email: response.email,
      // Other user properties
    };

    // Save the user in your database or update existing user
    // ...

    return user;
  }
}