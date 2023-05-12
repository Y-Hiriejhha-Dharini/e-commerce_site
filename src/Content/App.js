import Layout from '../Layout/Layout';

function App() {
    window.onbeforeunload = function() {
      localStorage.removeItem('user_info');
      return '';
    };
  return (
    <div className="App">
      <Layout>
        
      </Layout>
    </div>
  );
}

export default App;

