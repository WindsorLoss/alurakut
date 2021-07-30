import { Site, SiteClient } from 'datocms-client'

export default async function recebedorDeRequests(request, response) {

    if(request.method === 'POST'){

        const TOKEN = 'ece4f14a0a8f1d6aa8a8758f383398'
        const client = new SiteClient(TOKEN)

        const { name, image, creatorSlug } = request.body
    
        const registroCriado = await client.items.create({
            itemType: '981096',
            name,
            image,
            creatorSlug
        })
    
        return response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado
        })
    }

    return response.status(404).json({
        message: 'nada aqui'
    })

}