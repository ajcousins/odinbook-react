import "./App.scss";
import LeftSideBar from "./components/LeftSideBar";

function App() {
  return (
    <div className='App'>
      <div className='wrapper-main'>
        <LeftSideBar />
        <div className='content'>
          <div className='mainfeed'></div>
          <div className='rightsidebar'>
            Rightsidebar rightsidebar rightsidebar rightsidebar rightsidebar
            rightsidebar rightsidebar rightsidebar rightsidebar rightsidebar
            rightsidebar rightsidebar
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
