import { AbortController } from 'abort-controller';
import { Piscina } from "piscina";


export default class Machine {
    constructor(scriptURI, options = { min: 5, max: 5 }) {
        this.piscina = new Piscina({
            filename: new URL(scriptURI, import.meta.url).href,
            minThreads: options.min,
            maxThreads: options.max
        });
    }

    async execute(code, data, options = { timeout: 10000 }) {
        const abortController = new AbortController();
        const { signal } = abortController;
        const channel = new MessageChannel();
        const { port1, port2 } = channel;
        let timeoutRef = null;
        port2.on('message', () => {
            console.log(111);
            timeoutRef = setTimeout(() => {
                console.log(2222);
                abortController.abort();
            }, options.timeout)

        });
        const result = await this.piscina.run({
            code,
            variables: data,
            channel: port1
        },
            {
                signal,
                transferList: [port1]
            });
        if (timeoutRef) clearTimeout(timeoutRef);
        return result;
    }
}