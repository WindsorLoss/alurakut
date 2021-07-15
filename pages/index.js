import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { useState } from 'react'
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

  const amigos = [{
    id: new Date(),
    title: 'juunegreiros',
    image: 'https://github.com/juunegreiros.png',
    url: 'https://github.com/juunegreiros'
  }, {
    id: new Date(),
    title: 'omariosouto',
    image: 'https://github.com/omariosouto.png',
    url: 'https://github.com/omariosouto'
  }, {
    id: new Date(),
    title: 'peas',
    image: 'https://github.com/peas.png',
    url: 'https://github.com/peas'
  }, {
    id: new Date(),
    title: 'rafaballerini',
    image: 'https://github.com/rafaballerini.png',
    url: 'https://github.com/rafaballerini'
  }, {
    id: new Date(),
    title: 'felipefialho',
    image: 'https://github.com/felipefialho.png',
    url: 'https://github.com/felipefialho'
  }]

  const [comunidades, setComunidades] = useState([{
    id: '1',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }])

  function handleCriaComunidade(e) {
    e.preventDefault()

    const dadosDoForm = new FormData(e.target)
    
    const novaComunidade = {
      id: new Date(),
      title: dadosDoForm.get('title'),
      image: dadosDoForm.get('image')
    }

    setComunidades([...comunidades, novaComunidade])
    dadosDoForm.delete('title')
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
                  placeholder='Qual vai ser o nome da sua comunidade?' 
                  name='title' 
                  aria-label='Qual vai ser o nome da sua comunidade?'
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
          <RelationsDisplay title='Minhas comunidades' relationsItems={comunidades}/>
          
        </div>
        
      </MainGrid>

    </>
  )
}
