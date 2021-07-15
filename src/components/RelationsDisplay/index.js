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
                  <li key={`${itemAtual.id} + ${itemAtual.title}`}>
                    <a href={itemAtual.url ? itemAtual.url : '#'} target="_blank">
                      <img src={itemAtual.image 
                            ? itemAtual.image
                            : 'https://picsum.photos/300'}/>
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
    )
}
