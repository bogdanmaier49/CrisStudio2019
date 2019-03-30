import * as React from 'react';
import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import HomeView from 'src/views/Home';
import LoginView from 'src/views/LoginView';
import RegisterView from 'src/views/RegisterView';
import UserDetailsView from './views/UserDetailsView';
import ContentView from './views/ContentView';
import AdminView from './views/AdminView';
import OrderView from './views/OrderView';
import AlbumeView from './views/AlbumeView';
import ConfirmareComanda from './views/ConfirmareComanda';

class App extends React.Component<any, any> {

	constructor(props: any) {
		super(props);
	}

    public render() {
        return (
			<>
				<Switch>
					<Route path='/' component={HomeView} exact/>
					<Route path='/login' component={LoginView} exact/>
					<Route path='/register' component={RegisterView} exact/>
					<Route path='/account' component={UserDetailsView} exact/>
					<Route path='/admin' component={AdminView} exact/>
					<Route path='/order' component={OrderView} exact/>
					<Route path='/confirmare' component={ConfirmareComanda} exact/>

					<Route path='/albume' component={AlbumeView} exact/>

					<Route path='/cutiialbume' render={() => 
						<ContentView title='Cutii Albume'> </ContentView>
					} exact/>

					<Route path='/tablouri' render={() => 
						<ContentView title='Tablouri'> </ContentView>
					} exact/>

					<Route path='/printuri' render={() => 
						<ContentView title='Printuri'> </ContentView>
					} exact/>

					<Route path='/cutiistickuri' render={() => 
						<ContentView title='Cutii Stickuri'> </ContentView>
					} exact/>

					<Route path='/mapestickuri' render={() => 
						<ContentView title='Mape Stickuri'> </ContentView>
					} exact/>

				</Switch>
			</>
        );
    }
}

export default withRouter(App);
