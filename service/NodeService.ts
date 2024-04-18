import {StorageService} from "./StorageService";
import {NostrEvent} from "../model/NostrEvent";
import {verifyEvent} from "nostr-tools";

export class NodeService {

    private storageService = new StorageService()

    async getNodeIdentity(nodeUrl: string) {
        const response = await fetch(nodeUrl+'/identity', {
            method: 'GET',
            headers: {
                Accept: 'text/plain',
                'Content-Type': 'text/plain',
            }
        })

        if(response.ok) {
            const nodeNpub = await response.text()
            await this.storageService.set('nodeNpub', nodeNpub)
            await this.storageService.set('nodeUrl', nodeUrl)
            return true
        } else {
            throw 'Invalid node url'
        }
    }

    async postEvent(event: NostrEvent) {
        let nodeUrl = await this.storageService.get('nodeUrl')

        const response = await fetch(nodeUrl+'/entrypoint', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        })

        if(response.ok) {
            let responseEvent = await response.json()
            const responseNostrEvent = new NostrEvent(responseEvent)

            if(verifyEvent(responseNostrEvent)) {
                return JSON.parse(responseNostrEvent.content)
            }
        } else {
            throw 'Invalid node url'
        }
    }

}