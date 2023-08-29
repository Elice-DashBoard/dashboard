import GlobalStyle from "./styles/GlobalStyle";
import DragDrop from "./components/DragDrop";
import Layout from "./components/Layout";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <DragDrop />
      </Layout>
    </>
  );
};

export default App;
