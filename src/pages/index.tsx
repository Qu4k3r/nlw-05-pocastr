export default function Home() {
  return (
    <div>
      <h1>Index</h1>
    </div>
  );
}

// SSR => executado toda vez que um cliente acessa essa pagina no browser
// no caso dessa aplicacao isso nao faz sentido, ja que essa pagina so precisa ser atualizada quando um novo episodio é lançado
// nesse caso, nao usamos esse tipo de logica

/* export async function getServerSideProps() {
  const url = 'http://localhost:3333/episodes';
  const requisition = await fetch(url);
  const response = await requisition.json();

  return {
    props: {
      episodes: response,
    }
  }
} */

// SSG => gera uma versao estatica da pagina(html puro) em seu primeiro acesso;
// nao faz requisicao à API após seu primeiro acesso;
// é possivel programar um "timer" para que a pagina seja renderizada novamente, consumindo a API;
// aumenta a performance da pagina, no nosso caso;
// so funciona em producao;
// obrigatoriamente deve ser feito built-in (ou construcao) do projeto para que a aplicacao funcione corretamente;
// yarn build -> "builda" a aplicacao;

export async function getStaticSideProps() {
  const url = 'http://localhost:3333/episodes';
  const requisition = await fetch(url);
  const response = await requisition.json();

  return {
    props: {
      episodes: response,
    },
    revalidate: 60 * 60 * 24, // chave que programa a pagina para ser renderizada em um intervalo de tempo(segundos) fixo
  }
}
