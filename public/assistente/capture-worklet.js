// AudioWorklet que captura o microfone e devolve PCM 16-bit (Int16) em blocos.
// O AudioContext de entrada roda a 16000 Hz, então aqui é só converter
// Float32 [-1,1] -> Int16 e acumular um pouco antes de mandar (menos mensagens).

class CaptureProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this._buf = [];
    this._alvo = 1600; // ~100ms a 16kHz
  }

  process(inputs) {
    const input = inputs[0];
    if (input && input[0]) {
      const canal = input[0]; // Float32Array (~128 amostras)
      for (let i = 0; i < canal.length; i++) {
        let s = canal[i];
        if (s > 1) s = 1;
        else if (s < -1) s = -1;
        this._buf.push(s < 0 ? s * 0x8000 : s * 0x7fff);
      }
      if (this._buf.length >= this._alvo) {
        const out = new Int16Array(this._buf);
        this._buf = [];
        // transfere o buffer (sem copiar) pra thread principal
        this.port.postMessage(out.buffer, [out.buffer]);
      }
    }
    return true;
  }
}

registerProcessor("capture-processor", CaptureProcessor);
