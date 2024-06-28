export interface EchoData {
    id: number,
    name: string,
    displayName?: string,
    code: string,
    class: string,
    cost: number,
    skill: {
        description: string,
        cooldown: number,
        scaling: string[][]
    },
    sonata: string[][],
    hasPhantom: boolean,
    type: string,
    nation: string[][],
    release: {
        version: string
    }
}