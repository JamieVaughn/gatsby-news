import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fab)

const Footer = () => {

    return (
        <footer className='site-footer'>
            <h4>Money Circuit</h4>
            <p>Follow us on social media</p>
            <div className='footer-social-links'>
                <ul className='social-links-list'>
                    <li>
                        <a href="https://www.facebook.com" target='_blank' rel='noopener noreferrer' className='facebook'>
                            <FontAwesomeIcon icon={['fab', 'facebook']} className='display-4'/>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.twitter.com" target='_blank' rel='noopener noreferrer' className='twitter'>
                            <FontAwesomeIcon icon={['fab', 'twitter']} className='display-4'/>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com" target='_blank' rel='noopener noreferrer' className='linkedin'>
                            <FontAwesomeIcon icon={['fab', 'linkedin']} className='display-4'/>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.github.com" target='_blank' rel='noopener noreferrer' className='github'>
                            <FontAwesomeIcon icon={['fab', 'github']} className='display-4'/>
                        </a>
                    </li>
                </ul>
            </div>
           <div>
                © {new Date().getFullYear()}, 
                {` `}
                <a href="https://www.moneycircuit.com">Money Circuit</a>
           </div>
        </footer>
    )
}

export default Footer