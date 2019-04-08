import * as React from 'react';
import { Row, Col } from "react-bootstrap";
import { NUMAR_TELEFON_HEADER } from 'src/service/labels';

interface IHeaderProps {
    onLogoClick: () => void;
    onRightButtonClick: () => void;
    rightButtonLabel: string;
    showLogout: boolean;
    onLogoutClick: () => void;
    onOrderCLick: () => void;
}

export default class Header extends React.Component<IHeaderProps> {

    public constructor (props: any) {
        super(props);
    }

    render () {

        return (
            <header className='container-fluid'>
                <Row className='bottom-shadow serction-1'>
                    <div className='container-fluid'>
                        <Row className='first-row'>
                            <Col smPush={4} xs={12} sm={4} id='logo' className='logo'>
                                <span onClick={this.props.onLogoClick}>
                                    <div className='center-container width100 noselect'> <h1> ac </h1> </div>
                                    <div className='center-container width100 sub noselect'> <h3> agentia cris </h3> </div>
                                </span>
                            </Col>
                            <Col smPull={4} xs={6} sm={4} id='phone' className='info center-container'>
                                <i className="material-icons">contact_phone</i>
                                <span> { NUMAR_TELEFON_HEADER } </span>
                            </Col>
                            <Col xs={6} sm={4} id='user-details' className='info center-container'>
                                <i className="material-icons noselect">account_circle</i>
                                <a onClick={this.props.onRightButtonClick}> {this.props.rightButtonLabel} </a>
                                {this.props.showLogout === true ? <> / <a onClick={this.props.onLogoutClick}> LogOut </a> </>: <> </>}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className='header-order-button noselect'>
                                    <button onClick={this.props.onOrderCLick}> Comanda </button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Row>
                <Row className='center-container button-section'>
                    {/* {headerButtons.map(btn => <button key={'key_' + btn.label} className='header-button' onClick={btn.onClick}> {btn.label} </button>)} */}
                </Row>
            </header>
        );
    }
}
