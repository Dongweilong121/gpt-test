import React, { useEffect, useState } from "react";
import { Admin, DataProvider, Resource } from "react-admin";
import buildGraphQLProvider from "./data-provider/graphqlDataProvider";
import { theme } from "./theme/theme";
import Login from "./Login";
import "./App.scss";
import Dashboard from "./pages/Dashboard";
import { MessageList } from "./message/MessageList";
import { MessageCreate } from "./message/MessageCreate";
import { MessageEdit } from "./message/MessageEdit";
import { MessageShow } from "./message/MessageShow";
import { ChatRoomList } from "./chatRoom/ChatRoomList";
import { ChatRoomCreate } from "./chatRoom/ChatRoomCreate";
import { ChatRoomEdit } from "./chatRoom/ChatRoomEdit";
import { ChatRoomShow } from "./chatRoom/ChatRoomShow";
import { ParticipantList } from "./participant/ParticipantList";
import { ParticipantCreate } from "./participant/ParticipantCreate";
import { ParticipantEdit } from "./participant/ParticipantEdit";
import { ParticipantShow } from "./participant/ParticipantShow";
import { UserList } from "./user/UserList";
import { UserCreate } from "./user/UserCreate";
import { UserEdit } from "./user/UserEdit";
import { UserShow } from "./user/UserShow";
import { httpAuthProvider } from "./auth-provider/ra-auth-http";

const App = (): React.ReactElement => {
  const [dataProvider, setDataProvider] = useState<DataProvider | null>(null);
  useEffect(() => {
    buildGraphQLProvider
      .then((provider: any) => {
        setDataProvider(() => provider);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);
  if (!dataProvider) {
    return <div>Loading</div>;
  }
  return (
    <div className="App">
      <Admin
        title={"ChatService"}
        dataProvider={dataProvider}
        authProvider={httpAuthProvider}
        theme={theme}
        dashboard={Dashboard}
        loginPage={Login}
      >
        <Resource
          name="Message"
          list={MessageList}
          edit={MessageEdit}
          create={MessageCreate}
          show={MessageShow}
        />
        <Resource
          name="ChatRoom"
          list={ChatRoomList}
          edit={ChatRoomEdit}
          create={ChatRoomCreate}
          show={ChatRoomShow}
        />
        <Resource
          name="Participant"
          list={ParticipantList}
          edit={ParticipantEdit}
          create={ParticipantCreate}
          show={ParticipantShow}
        />
        <Resource
          name="User"
          list={UserList}
          edit={UserEdit}
          create={UserCreate}
          show={UserShow}
        />
      </Admin>
    </div>
  );
};

export default App;
