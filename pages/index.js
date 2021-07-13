import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfileSidebar({ user }) {
  return (
    <Box>
      <img style={{borderRadius: '8px'}} src={`https://github.com/${user}.png`}/>
    </Box>
  )

}

export default function Home() {

  const githubUser = 'windsorloss'
  const pessoasFavoritas = ['juunegreiros', 'omariosouto', 'peas', 'rafaballerini', 'felipefialho']

  return (
    <>

      <AlurakutMenu />

      <MainGrid>

        <div className="profileArea" style={{gridArea: 'profileArea'}}>
          <ProfileSidebar user={githubUser} />
        </div>

        <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className='title'>Bem vindo</h1>
            <OrkutNostalgicIconSet/>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>
              Pessoas da Comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map(itemAtual => {
                return (
                  <li key={itemAtual}>
                    <a href={`https://github.com/${itemAtual}`} target="_blank">
                      <img src={`https://github.com/${itemAtual}.png`}/>
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
        
      </MainGrid>

    </>
  )
}
