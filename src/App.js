import "./App.scss";
import LeftSideBar from "./components/LeftSideBar";
import MainFeed from "./components/MainFeed";
import Test from "./components/Test";

function App() {
  return (
    <div className='App'>
      <div className='wrapper-main'>
        <LeftSideBar />
        <div className='content'>
          <MainFeed title='Home' />
          <div className='rightsidebar'></div>
        </div>
      </div>
    </div>
  );
}

export default App;
