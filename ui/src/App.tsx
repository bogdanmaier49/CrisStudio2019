import * as React from 'react';
import './App.css';
import { Route, withRouter } from 'react-router-dom';
import HomeView from 'src/views/Home';
import LoginView from 'src/views/LoginView';
import RegisterView from 'src/views/RegisterView';
import UserDetailsView from './views/UserDetailsView';
import ContentView from './views/ContentView';
import AdminView from './views/AdminView';
import OrderView from './views/OrderView';
import AlbumeView from './views/AlbumeView';
import ConfirmareComanda from './views/ConfirmareComanda';
import { DIRECTORY_GALERY_CUTII_ALBUME, DIRECTORY_GALERY_CUTII_TICK, DIRECTORY_GALERY_MAPE_STICK } from './service/client';
import { Subtitle } from './components/Subtitle';
import { EMAIL_SUPPORT } from './service/labels';


class App extends React.Component<any, any> {

	constructor(props: any) {
		super(props);
	}

    public render() {
        return (
			<>
				<Route path='/' component={HomeView} exact />

				<Route path='/login' component={LoginView} exact/>
				<Route path='/register' component={RegisterView} exact/>
				<Route path='/account' component={UserDetailsView} exact/>
				<Route path='/admin' component={AdminView} exact/>
				<Route path='/order' component={OrderView} exact/>
				<Route path='/confirmare' component={ConfirmareComanda} exact/>

				<Route path='/albume' component={AlbumeView} exact/>

				<Route path='/cutiialbume' render={() => 
					<ContentView title='Cutii Albume' imagesFolder={DIRECTORY_GALERY_CUTII_ALBUME}> </ContentView>
				} exact/>

				<Route path='/tablouri' render={() => 
					<ContentView title='Tablouri'> </ContentView>
				} exact/>

				<Route path='/printuri' render={() => 
					<ContentView title='Printuri'> </ContentView>
				} exact/>

				<Route path='/cutiistickuri' render={() => 
					<ContentView title='Cutii Stick' imagesFolder={DIRECTORY_GALERY_CUTII_TICK}> </ContentView>
				} exact/>

				<Route path='/mapestickuri' render={() => 
					<ContentView title='Mape Stick' imagesFolder={DIRECTORY_GALERY_MAPE_STICK}> </ContentView>
				} exact/>


				<Route path='/notverified' render={() => 
					<ContentView title='Eroare' dontShowButton={true}> 
						<Subtitle title='Cont neverificat' />

						<p> Contul dumneavoastra trebuie verificat inainte de a putea plasa o comanda. </p>
						<p> Contactati: <a> {EMAIL_SUPPORT} </a> pentru mai multe detalii. </p>
						<p> Va multumim pentru intelegere! </p>

						<div className='center-container margin-top-45'>
							<button onClick={() => {this.props.history.push('/')}}> Inapoi la pagina principala </button>
						</div>
					</ContentView>
				} exact/>

				<Route path='/success' render={() => 
					<ContentView title='Success' dontShowButton={true}> 

						<div className='noselect success center-container margin-top-45 margin-bottom-45'> <i className="material-icons green"> done_outline </i> </div>

						<div className='center-container noselect'>
							<span>
								<p> Comanda dumneavoastra a fost realizata cu success. </p>
								<p> Va multumim ca ati ales Agenti Cris. </p>
							</span>
						</div>

						<div className='center-container margin-top-45'>
							<button onClick={() => {this.props.history.push('/')}}> Inapoi la pagina principala </button>
						</div>
					</ContentView>
				} exact/>
			</>
        );
    }
}

export default withRouter(App);
