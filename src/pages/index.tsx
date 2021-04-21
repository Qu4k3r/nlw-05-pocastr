import { GetStaticProps } from 'next';
import Image from 'next/image';
import api from '../services/api';
import { convertDuration, convertDate } from '../utils/convertDateAndDuration';
import styles from './home.module.scss';


type Episode = {
  description: string,
  duration: number,
  durationAsString: string,
  id: string,
  members: string,
  publishedAt: string,
  thumbnail: string,
  title: string,
  url: string,
}

type HomeProps = {
  latestEpisodes: Episode[],
  allEpisodes: Episode[],
}

export default function Home({allEpisodes, latestEpisodes}: HomeProps) {
  return (
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>
        <ul>
          { latestEpisodes.map((episode) => (
            <li key={ episode.id }>
              <Image
                src={episode.thumbnail}
                alt={episode.title}
                width={192}
                height={192}
                objectFit='cover'
              />

              <div className={styles.episodeDetails}>
                <a href="">{episode.title}</a>
                <p>{episode.members}</p>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationAsString}</span>
              </div>
                <button type="button">
                  <img src="/play-green.svg" alt="Tocar episodio"/>
                </button>
            </li>
          )) }
        </ul>
      </section>
      <section className={styles.allEpisodes}>

      </section>
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

export const getStaticProps:GetStaticProps = async() => {
  const path = 'episodes';
  const { data } = await api.get(path, {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    },
  });

  const episodes = data.map((episode) => ({
    description: episode.description,
    duration: Number(episode.file.duration),
    durationAsString: convertDuration(Number(episode.file.duration)),
    id: episode.id,
    members: episode.members,
    publishedAt: convertDate(episode.published_at),
    thumbnail:episode.thumbnail,
    title: episode.title,
    url: episode.file.url,
  }));

  const [episode1, episode2] = episodes;
  const latestEpisodes = [episode1, episode2];
  const allEpisodes = episodes.filter((episode) => episode !== episode1 && episode !== episode2);

  return {
    props: {
      episodes,
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 24, // chave que programa a pagina para ser renderizada em um intervalo de tempo(segundos) fixo
  }
}
