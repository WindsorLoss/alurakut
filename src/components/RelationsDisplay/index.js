import { ProfileRelationsBoxWrapper } from "../ProfileRelations"

export function RelationsDisplay({ title, relationsItems }) {
    return (
        <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>
                {title} ({relationsItems.length})
            </h2>

            <ul>
              {relationsItems.map((itemAtual, index) => {
                if(index <= 5) return (
                  <li key={`${itemAtual.id} + ${itemAtual.name}`}>
                    <a href={itemAtual.url || itemAtual.html_url ? itemAtual.html_url || itemAtual.url  : '#'} target="_blank">
                      <img src={itemAtual.image || itemAtual.avatar_url 
                            ? itemAtual.image || itemAtual.avatar_url
                            : 'https://picsum.photos/300'}/>
                      <span>{itemAtual.name || itemAtual.login}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
    )
}
