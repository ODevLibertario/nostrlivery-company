import {finalizeEvent, nip19} from "nostr-tools";

export class NostrService {

    signNostrliveryEvent(nsec: string, eventType: string, params: Object) {
        let sk = nip19.decode(nsec)

        return finalizeEvent({
            kind: 1,
            created_at: Math.floor(Date.now() / 1000),
            tags: [],
            content: JSON.stringify({
                eventType: 'LOGIN',
                params: {}
            }),
        }, sk.data as Uint8Array)
    }

}