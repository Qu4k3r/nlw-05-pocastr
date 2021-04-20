import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@500;600&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript /> 
        </body>
      </Html>
      );
  }
}

// componente que e engloba _app e suas rotas, renderizado apenas uma vez;
// este arquivo html nao pode ser implementado diretamente no _app, pois o _app é renderizado toda vez que a rota é alterada;
