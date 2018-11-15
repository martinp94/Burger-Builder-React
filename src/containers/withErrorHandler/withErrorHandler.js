import React, { Component } from 'react'

import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = ( WrappedComponent, axios ) => {
    
    return class extends Component {

        state = {
            error: null
        }

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(request => {
                this.setState({ error: null })
                return request
            })

            this.resInterceptor = axios.interceptors.response.use(null, (error) => {
                this.setState({ error })
            })
        }

        componentWillUnmount() {
            console.log('will unmount')
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        closeModal = () => {
            this.setState({ error: null })
        }

        render() {
            return (
                <React.Fragment>
                    <Modal 
                        show={this.state.error}
                        clickBackdrop={this.closeModal} >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            )
        }
        
    }
}

export default withErrorHandler