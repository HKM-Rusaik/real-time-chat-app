import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ): void {
    console.log('Message received:', message);

    const filteredMessage = message.toLowerCase().includes('chicken')
      ? null
      : message;

    if (filteredMessage === null) {
      console.log('Message contains "chicken". Filtering out.');
      return;
    }

    client.broadcast.emit('receive-message', {
      message,
      socketId: client.id,
      private: false,
    });
  }

  @SubscribeMessage('private_message')
  handlePrivateMessage(
    @MessageBody() data: { message: string; socketId: string },
    @ConnectedSocket() client: Socket,
  ): void {
    const { message, socketId } = data;
    console.log(`Private message from ${client.id} to ${socketId}: ${message}`);
    try {
      this.server.to(socketId).emit('receive-message', {
        message,
        socketId: client.id,
        private: true,
      });
      console.log(`Private message sent to ${socketId}`);
    } catch (error) {
      console.error(`Error sending private message to ${socketId}:`, error);
    }
  }
}
