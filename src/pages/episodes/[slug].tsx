import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import api from '../../services/api';
import { convertDate, convertDuration } from '../../utils/convertDateAndDuration';
import styles from './episode.module.scss';

interface Episode {
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

interface EpisodeProps {
  episode: Episode,
}

export default function Episode({ episode }: EpisodeProps) {
  // const { slug } = useRouter().query;
  // caso queira renderizar o path para teste: {/* <h1>{slug}</h1> */}


  // esse componente renderiza uma rota diferente da home, ou seja, diferente do path=/
  // entao qualquer parametro que eu colocar apos /episodes * será renderizado por esse componente

  // *Obs.: a rota utilizada é episode/path porque esse componente está dentro de um diretorio episodes
  return (
    <div className={styles.episode}>
      <div className={styles.thumbnailContainer}>
        <Link href="/">
          <button type="button">
            <img src="/arrow-left.svg" alt="Voltar"/>
          </button>
        </Link>
        <Image 
          src={episode.thumbnail}
          alt={episode.title}
          width={700}
          height={160}
          objectFit="cover"
        />
          <button type="button">
            <img src="/play.svg" alt="Tocar episodio"/>
          </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: episode.description }}
      />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // ainda duvidas quanto essa funcao
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (match) => {
  const { slug } = match.params;
  const { data } = await api.get(`/episodes/${slug}`);
  const episode = {
    description: data.description,
    duration: Number(data.file.duration),
    durationAsString: convertDuration(Number(data.file.duration)),
    id: data.id,
    members: data.members,
    publishedAt: convertDate(data.published_at),
    thumbnail:data.thumbnail,
    title: data.title,
    url: data.file.url,
  };

  return {
    props: {
      episode,
    },
    revalidate: 60 * 60 * 24
  }
}

// um componente criado na pasta pages que nao comece com _ automagicamente vira uma rota;
// slug é o nome do parametro que se da apos a rota /episode;
