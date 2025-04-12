// src/utils/ircClient.ts
type IRCEvent = 
  | { event: 'registered' }
  | { event: 'message'; from: string; to: string; text: string }
  | { event: 'error'; message: string };

type ConnectOptions = {
  host: string;
  port: number;
  nick: string;
  tls: boolean;
};

export class IRCClient {
  private ws: WebSocket | null = null;
  private listeners: {
    [K in IRCEvent['event']]?: ((payload: Extract<IRCEvent, { event: K }>) => void)[]
  } = {};

  connect(url: string, opts: ConnectOptions) {
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      this.send({ cmd: 'connect', data: opts });
    };

    this.ws.onmessage = e => {
      let msg: IRCEvent;
      try {
        msg = JSON.parse(e.data);
      } catch {
        return this.emit('error', { event: 'error', message: 'Invalid JSON from bridge' });
      }
      this.emit(msg.event, msg as any);
    };

    this.ws.onerror = e => {
      this.emit('error', { event: 'error', message: 'WebSocket error' });
    };

    this.ws.onclose = () => {
    };
  }

  say(target: string, text: string) {
    this.send({ cmd: 'say', data: { target, text } });
  }

  join(channel: string) {
    this.send({ cmd: 'join', data: { channel } });
  }

  part(channel: string) {
    this.send({ cmd: 'part', data: { channel } });
  }

  on<K extends IRCEvent['event']>(
    event: K,
    cb: (payload: Extract<IRCEvent, { event: K }>) => void
  ) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event]!.push(cb as any);
  }

  private emit<K extends IRCEvent['event']>(event: K, payload: Extract<IRCEvent, { event: K }>) {
    (this.listeners[event] || []).forEach(cb => cb(payload));
  }

  private send(msg: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(msg));
    }
  }
}
