import styles from './styles.module.scss';

export default function Header() {
  const date = new Date();
  const fullDate = date.toLocaleDateString('pt-BR', {dateStyle: "full"});
  return(
    <header className={styles.headerContainer}>
      <img src="/logo.svg" alt="podcast logo"/>
      <p>O melhor para você ouvir, sempre!</p>
      <span>{fullDate}</span>
    </header>
  );
}
