import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { useEffect, useState } from 'react'
import { RelationsDisplay } from '../src/components/RelationsDisplay'

function ProfileSidebar({ user }) {
  return (
    <Box as='aside'>
      <img style={{borderRadius: '8px'}} src={`https://github.com/${user}.png`}/>

      <hr/>

      <p>
        <a className='boxLink' target='_blank' href={`https://github.com/${user}`}>
          @{user}
        </a>
      </p>

      <hr/>

      <AlurakutProfileSidebarMenuDefault />

    </Box>
  )

}

export default function Home() {

  const githubUser = 'windsorloss'

  const [amigos, setAmigos] = useState([])
  const [seguidores, setSeguidores] = useState([]) 
  const [comunidades, setComunidades] = useState([])
  
  useEffect(() => {
    fetch('https://api.github.com/users/windsorloss/followers')
      .then((res) => res.json())
      .then((res) => setSeguidores(res))

    // API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '50d571c41be7ca78324481793e3f37',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          id,
          name,
          image,
          creatorSlug
        }
      }` })
    })
      .then(res => res.json())
      .then(res => {
        const comunidades = res.data.allCommunities
        setComunidades(comunidades)
      })

    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '50d571c41be7ca78324481793e3f37',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ "query": `query {
        allFriends {
          id,
          name,
          url,
          image
        }
      }` })
    })
      .then(res => res.json())
      .then(res => {
        const amigos = res.data.allFriends
        setAmigos(amigos)
      })


  }, [])


  function handleCriaComunidade(e) {
    e.preventDefault()

    const dadosDoForm = new FormData(e.target)
    
    const novaComunidade = {
      name: dadosDoForm.get('title'),
      image: dadosDoForm.get('image') || 'https://placehold.it/300x300',
      creatorSlug: githubUser
    }

    fetch('/api/comunidades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(novaComunidade)
    })
      .then(async response => {
        const { registroCriado } = await response.json();
        setComunidades([...comunidades, registroCriado])
        console.log(registroCriado)
      })

  }


  return (
    <>

      <AlurakutMenu githubUser={githubUser}/>

      <MainGrid>

        <div className="profileArea" style={{gridArea: 'profileArea'}}>
          <ProfileSidebar user={githubUser} />
        </div>

        <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className='title'>Bem vindo</h1>
            <OrkutNostalgicIconSet/>
          </Box>

          <Box>
            <h2 className='subTitle'>O que você deseja fazer?</h2>

            <form onSubmit={handleCriaComunidade} >

              <div>
                <input 
                  placeholder='Qual será o nome da sua comunidade?' 
                  name='title' 
                  aria-label='Qual será o nome da sua comunidade?'
                  type='text'
                />
              </div>

              <div>
                <input 
                  placeholder='Coloque uma URL para usarmos de capa' 
                  name='image' 
                  aria-label='Coloque uma URL para usarmos de capa'
                />
              </div>

              <button>
                Criar comunidade
              </button>

            </form>

          </Box>

        </div>

        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
          
          <RelationsDisplay title='Meus amigos' relationsItems={amigos}/>
          <RelationsDisplay title='Seguidores Github' relationsItems={seguidores}/>
          <RelationsDisplay title='Minhas comunidades' relationsItems={comunidades}/>
          
        </div>
        
      </MainGrid>

    </>
  )
}
