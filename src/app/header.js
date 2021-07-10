import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Background from './images/pirate-mod.jpg'
import RaisedButton from 'material-ui/RaisedButton';
import Search from './search'
import Tooltip from './tooltip'
import ContextMenu from './context-menu'

import createTorrent from 'create-torrent';
import fs from 'fs'
let dialog
if(typeof WEB === 'undefined')
	dialog = require('electron').remote.dialog
class Header extends React.Component {
	constructor(props)
	{
		super(props)
		this.header = React.createRef();
	}
	componentDidMount()
	{
		window.onscroll = () => {
			if (window.pageYOffset >= 15)
			{
				const scrollHeight = Math.max(
					document.body.scrollHeight, document.documentElement.scrollHeight,
					document.body.offsetHeight, document.documentElement.offsetHeight,
					document.body.clientHeight, document.documentElement.clientHeight
				);

				if(scrollHeight - 240 < document.documentElement.clientHeight)
				{
					return
				}

				if(!this.stickyHeader)
				{
					this.stickyHeader = true
					this.header.current.classList.add("sticky");
				}
			}
			else
			{
				if(this.stickyHeader)
				{
					this.stickyHeader = false
					this.header.current.classList.remove("sticky");
				}
			}
		};
	}
	componentWillUnmount()
	{
		window.onscroll = null
	}

	generateTorrent(folder)
	{
		let path = dialog.showOpenDialogSync({properties: [folder ? "openDirectory" : "openFile"]})
		if(path && path[0])
		{
			path = path[0]
			createTorrent(path, (err, torrent) => {
				if (!err) {
					console.log('generated torrent size', torrent.length)
					let savePath = dialog.showSaveDialogSync({title: 'Save generated torrent file', defaultPath: 'generated', filters: [
						{ name: 'Torrent files', extensions: ['torrent'] },
					  ]});
					if(savePath) {
						fs.writeFileSync(savePath, torrent)
						console.log('saved', torrent.length, 'to', savePath)
						torrentSocket.emit('dropTorrents', [{path: savePath}]);
					}
				}
			})
		}
	}

	render()
	{
		return (
			<div ref={this.header} className='header'>
				<Card className='w100p header-main' style={{position: 'fixed', zIndex: 2}}>
					<CardMedia
						overlay={<CardTitle className='header-title' title={__('Yarrr, Landlubbers!')} style={{paddingTop: 2}} subtitle={
							<div>
								<div className='row' style={{position: 'absolute', top: -65}}>
									<Tooltip hint={__('main settings')}>
										<svg className='clickable'
											onClick={() => {
												window.router('/config')
											}}
											fill='white' style={{height: 45, margin: 4}} viewBox="0 0 932.179 932.179">
											<g>
												<path d="M61.2,341.538c4.9,16.8,11.7,33,20.3,48.2l-24.5,30.9c-8,10.1-7.1,24.5,1.9,33.6l42.2,42.2c9.1,9.1,23.5,9.899,33.6,1.899
                  l30.7-24.3c15.8,9.101,32.6,16.2,50.1,21.2l4.6,39.5c1.5,12.8,12.3,22.4,25.1,22.4h59.7c12.8,0,23.6-9.601,25.1-22.4l4.4-38.1
                  c18.8-4.9,36.8-12.2,53.7-21.7l29.7,23.5c10.1,8,24.5,7.1,33.6-1.9l42.2-42.2c9.1-9.1,9.9-23.5,1.9-33.6l-23.1-29.3
                  c9.6-16.601,17.1-34.3,22.1-52.8l35.6-4.1c12.801-1.5,22.4-12.3,22.4-25.1v-59.7c0-12.8-9.6-23.6-22.4-25.1l-35.1-4.1
                  c-4.801-18.3-12-35.8-21.199-52.2l21.6-27.3c8-10.1,7.1-24.5-1.9-33.6l-42.1-42.1c-9.1-9.1-23.5-9.9-33.6-1.9l-26.5,21
                  c-17.2-10.1-35.601-17.8-54.9-23l-4-34.3c-1.5-12.8-12.3-22.4-25.1-22.4h-59.7c-12.8,0-23.6,9.6-25.1,22.4l-4,34.3
                  c-19.8,5.3-38.7,13.3-56.3,23.8l-27.5-21.8c-10.1-8-24.5-7.1-33.6,1.9l-42.2,42.2c-9.1,9.1-9.9,23.5-1.9,33.6l23,29.1
                  c-9.2,16.6-16.2,34.3-20.8,52.7l-36.8,4.2c-12.8,1.5-22.4,12.3-22.4,25.1v59.7c0,12.8,9.6,23.6,22.4,25.1L61.2,341.538z
                  M277.5,180.038c54.4,0,98.7,44.3,98.7,98.7s-44.3,98.7-98.7,98.7c-54.399,0-98.7-44.3-98.7-98.7S223.1,180.038,277.5,180.038z"/>
												<path d="M867.699,356.238l-31.5-26.6c-9.699-8.2-24-7.8-33.199,0.9l-17.4,16.3c-14.699-7.1-30.299-12.1-46.4-15l-4.898-24
                  c-2.5-12.4-14-21-26.602-20l-41.1,3.5c-12.6,1.1-22.5,11.4-22.9,24.1l-0.799,24.4c-15.801,5.7-30.701,13.5-44.301,23.3
                  l-20.799-13.8c-10.602-7-24.701-5-32.9,4.7l-26.6,31.7c-8.201,9.7-7.801,24,0.898,33.2l18.201,19.399
                  c-6.301,14.2-10.801,29.101-13.4,44.4l-26,5.3c-12.4,2.5-21,14-20,26.601l3.5,41.1c1.1,12.6,11.4,22.5,24.1,22.9l28.1,0.899
                  c5.102,13.4,11.801,26.101,19.9,38l-15.699,23.7c-7,10.6-5,24.7,4.699,32.9l31.5,26.6c9.701,8.2,24,7.8,33.201-0.9l20.6-19.3
                  c13.5,6.3,27.699,11,42.299,13.8l5.701,28.2c2.5,12.4,14,21,26.6,20l41.1-3.5c12.6-1.1,22.5-11.399,22.9-24.1l0.9-27.601
                  c15-5.3,29.199-12.5,42.299-21.399l22.701,15c10.6,7,24.699,5,32.9-4.7l26.6-31.5c8.199-9.7,7.799-24-0.9-33.2l-18.301-19.399
                  c6.701-14.2,11.602-29.2,14.4-44.601l25-5.1c12.4-2.5,21-14,20-26.601l-3.5-41.1c-1.1-12.6-11.4-22.5-24.1-22.9l-25.1-0.8
                  c-5.201-14.6-12.201-28.399-20.9-41.2l13.699-20.6C879.4,378.638,877.4,364.438,867.699,356.238z M712.801,593.837
                  c-44.4,3.801-83.602-29.3-87.301-73.699c-3.801-44.4,29.301-83.601,73.699-87.301c44.4-3.8,83.602,29.301,87.301,73.7
                  C790.301,550.938,757.199,590.138,712.801,593.837z"/>
												<path d="M205,704.438c-12.6,1.3-22.3,11.899-22.4,24.6l-0.3,25.3c-0.2,12.7,9.2,23.5,21.8,25.101l18.6,2.399
                  c3.1,11.301,7.5,22.101,13.2,32.301l-12,14.8c-8,9.899-7.4,24.1,1.5,33.2l17.7,18.1c8.9,9.1,23.1,10.1,33.2,2.3l14.899-11.5
                  c10.5,6.2,21.601,11.101,33.2,14.5l2,19.2c1.3,12.6,11.9,22.3,24.6,22.4l25.301,0.3c12.699,0.2,23.5-9.2,25.1-21.8l2.3-18.2
                  c12.601-3.101,24.601-7.8,36-14l14,11.3c9.9,8,24.101,7.4,33.201-1.5l18.1-17.7c9.1-8.899,10.1-23.1,2.301-33.2L496.6,818.438
                  c6.6-11,11.701-22.7,15.201-35l16.6-1.7c12.6-1.3,22.299-11.9,22.4-24.6l0.299-25.301c0.201-12.699-9.199-23.5-21.799-25.1
                  l-16.201-2.1c-3.1-12.2-7.699-24-13.699-35l10.1-12.4c8-9.9,7.4-24.1-1.5-33.2l-17.699-18.1c-8.9-9.101-23.102-10.101-33.201-2.3
                  l-12.101,9.3c-11.399-6.9-23.6-12.2-36.399-15.8l-1.601-15.7c-1.3-12.601-11.899-22.3-24.6-22.4l-25.3-0.3
                  c-12.7-0.2-23.5,9.2-25.101,21.8l-2,15.601c-13.199,3.399-25.899,8.6-37.699,15.399l-12.5-10.2c-9.9-8-24.101-7.399-33.201,1.5
                  l-18.2,17.801c-9.1,8.899-10.1,23.1-2.3,33.199l10.7,13.801c-6.2,11-11.1,22.699-14.3,35L205,704.438z M368.3,675.837
                  c36.3,0.4,65.399,30.301,65,66.601c-0.4,36.3-30.301,65.399-66.601,65c-36.3-0.4-65.399-30.3-65-66.601
                  C302.1,704.538,332,675.438,368.3,675.837z"/>
											</g>
										</svg>
									</Tooltip>
									<Tooltip hint={__('filters settings')}>
										<svg className='clickable'
											onClick={() => {
												window.router('/filters')
											}}
											fill='white' style={{height: 45, margin: 4}} viewBox="0 0 512 512">
											<g>
												<g>
													<path d="M256,103.536c-58.559,0-106.2,47.641-106.2,106.2c0,4.512,3.657,8.169,8.169,8.169s8.169-3.658,8.169-8.169
                    c0-49.55,40.313-89.862,89.862-89.862c49.549,0,89.862,40.311,89.862,89.862c0,4.512,3.658,8.169,8.169,8.169
                    c4.513,0,8.169-3.658,8.169-8.169C362.2,151.177,314.559,103.536,256,103.536z"/>
												</g>
											</g>
											<g>
												<g>
													<path d="M256,136.213c-40.541,0-73.523,32.982-73.523,73.523c0,4.512,3.657,8.169,8.169,8.169s8.169-3.658,8.169-8.169
                    c0-31.532,25.654-57.185,57.185-57.185s57.185,25.653,57.185,57.185c0,4.512,3.657,8.169,8.169,8.169
                    c4.513,0,8.169-3.658,8.169-8.169C329.523,169.195,296.541,136.213,256,136.213z"/>
												</g>
											</g>
											<g>
												<g>
													<path d="M503.801,234.245H8.199c-4.513,0-8.169,3.658-8.169,8.169v43.569c0,2.721,1.354,5.263,3.612,6.781L167.331,402.76
                    c5.092,3.857,9.699,13.038,9.699,19.379v81.693c0,4.512,3.656,8.169,8.169,8.169h141.6c4.513,0,8.169-3.658,8.169-8.169v-81.693
                    c0-6.34,4.606-15.522,9.699-19.379l163.691-109.995c2.258-1.517,3.612-4.06,3.612-6.781v-43.569
                    C511.97,237.903,508.313,234.245,503.801,234.245z M495.632,277.815H157.969c-4.513,0-8.169,3.658-8.169,8.169
                    s3.657,8.169,8.169,8.169h319.028l-141.61,95.159c-0.1,0.068-0.199,0.137-0.296,0.209c-9.383,6.93-16.458,20.951-16.458,32.616
                    v73.523H193.37v-73.523c0-11.665-7.076-25.686-16.458-32.616c-0.098-0.072-0.197-0.142-0.296-0.209L35.003,294.153h90.289
                    c4.513,0,8.169-3.658,8.169-8.169s-3.657-8.169-8.169-8.169H16.368v-27.231h479.263V277.815z"/>
												</g>
											</g>
											<g>
												<g>
													<path d="M296.504,397.63h-81.006c-4.513,0-8.169,3.658-8.169,8.169c0,4.512,3.657,8.169,8.169,8.169h81.006
                    c4.513,0,8.169-3.658,8.169-8.169C304.674,401.288,301.016,397.63,296.504,397.63z"/>
												</g>
											</g>
											<g>
												<g>
													<path d="M458.171,168.573l-36.481-3.382c-3.895-14.477-9.68-28.351-17.251-41.376l23.416-28.2
                    c2.696-3.246,2.475-8.011-0.509-10.995l-46.545-46.545c-2.983-2.983-7.749-3.206-10.996-0.509L341.51,61.063
                    c-13.017-7.52-26.88-13.258-41.343-17.113l-3.386-36.534C296.391,3.213,292.866,0,288.647,0h-65.826
                    c-4.22,0-7.745,3.213-8.134,7.416l-3.401,36.68c-14.413,3.894-28.222,9.657-41.187,17.193L141.73,37.731
                    c-3.247-2.697-8.011-2.475-10.996,0.509L84.189,84.785c-2.983,2.983-3.203,7.749-0.509,10.995l23.634,28.465
                    c-7.486,12.964-13.206,26.763-17.059,41.156l-36.728,3.404c-4.201,0.389-7.416,3.915-7.416,8.134v32.798
                    c0.001,4.513,3.658,8.17,8.17,8.17s8.169-3.658,8.169-8.169v-25.352l35.083-3.251c3.51-0.325,6.415-2.864,7.206-6.298
                    c3.835-16.632,10.393-32.454,19.49-47.028c1.865-2.988,1.606-6.835-0.645-9.544l-22.579-27.193l36.013-36.013l27.111,22.511
                    c2.717,2.256,6.576,2.511,9.563,0.633c14.566-9.15,30.394-15.758,47.046-19.64c3.426-0.798,5.955-3.7,6.279-7.202l3.247-35.022
                    h50.931l3.235,34.896c0.326,3.513,2.869,6.419,6.307,7.209c16.7,3.833,32.582,10.405,47.205,19.535
                    c2.986,1.866,6.834,1.607,9.545-0.645l27.023-22.438l36.013,36.013l-22.371,26.941c-2.255,2.717-2.511,6.575-0.632,9.565
                    c9.189,14.625,15.814,30.514,19.69,47.225c0.795,3.429,3.699,5.964,7.203,6.287l34.829,3.229v25.582
                    c0,4.512,3.657,8.169,8.169,8.169s8.169-3.658,8.169-8.169v-33.029C465.586,172.488,462.373,168.963,458.171,168.573z"/>
												</g>
											</g>
										</svg>
									</Tooltip>
								</div>

								{__('Welcome to')} ROTB! {__('This is file search engine based on the torrents from the internet')}. 
								{__('Here you can easily find torrent or file that you intrested for')}. {__('We are not responsible for any content')}:
								{__('this is only information about content that collected automatically')}!
							</div>} />}
					>
						<div className='row header-row' style={{
							padding: '15px',
							background: `url('${Background}') no-repeat`,
							backgroundSize: 'cover',
							transition: '1s'
						}}>
							<RaisedButton
								label={__('Feed')}
								onClick={() => {
									window.router('/')
								}}
								backgroundColor='#69238c'
								labelColor='white'
								style={{height: 60, borderRadius: 6, margin: 5, zIndex: 1}}
								buttonStyle={{borderRadius: 5}}
								icon={<svg fill='white' style={{height: 28}} viewBox="0 0 64.051 64.051">
									<g>
										<path d="M8,0v2c16,0,31.173,7.065,41.472,19.386C57.567,31.065,62.051,43.358,62.051,56h2c0-13.11-4.649-25.858-13.044-35.897
            C40.326,7.327,25,0,8,0z"/>
										<path d="M50.769,56h2C52.769,31.343,33,11.282,8,11.282v2C32,13.282,50.769,32.445,50.769,56z"/>
										<path d="M8,22.564v2c17,0,31.486,14.102,31.486,31.436h2C41.486,37.563,26,22.564,8,22.564z"/>
										<path d="M30.205,56C30.205,43.784,20,33.846,8,33.846v2c11,0,20.205,9.041,20.205,20.154H30.205z"/>
										<path d="M16.103,56c0-4.439-3.612-8.051-8.052-8.051S0,51.561,0,56s3.611,8.051,8.051,8.051S16.103,60.439,16.103,56z M2,56
            c0-3.336,2.715-6.051,6.051-6.051c3.337,0,6.052,2.715,6.052,6.051s-2.715,6.051-6.052,6.051C4.715,62.051,2,59.336,2,56z"/>
									</g>
								</svg>
         
								}
							/>
							<RaisedButton
								label={__('Top')}
								onClick={() => {
									window.router('/top')
								}}
								backgroundColor='#B1CE57'
								labelColor='white'
								style={{height: 60, width: 120, borderRadius: 5, margin: 5, zIndex: 1}}
								buttonStyle={{borderRadius: 5}}
								icon={<svg fill='white' style={{height: 30}} viewBox="0 0 284.929 284.929">
									<g>
										<path d="M17.128,167.872c1.903,1.902,4.093,2.854,6.567,2.854c2.474,0,4.664-0.952,6.567-2.854L142.466,55.666l112.208,112.206
                        c1.902,1.902,4.093,2.854,6.563,2.854c2.478,0,4.668-0.952,6.57-2.854l14.274-14.277c1.902-1.902,2.847-4.093,2.847-6.563
                        c0-2.475-0.951-4.665-2.847-6.567L149.028,7.419c-1.901-1.906-4.088-2.853-6.562-2.853s-4.665,0.95-6.567,2.853L2.856,140.464
                        C0.95,142.367,0,144.554,0,147.034c0,2.468,0.953,4.658,2.856,6.561L17.128,167.872z"/>
										<path d="M149.028,117.055c-1.901-1.906-4.088-2.856-6.562-2.856s-4.665,0.953-6.567,2.856L2.856,250.1
                        C0.95,252.003,0,254.192,0,256.67c0,2.472,0.953,4.661,2.856,6.564l14.272,14.276c1.903,1.903,4.093,2.848,6.567,2.848
                        c2.474,0,4.664-0.951,6.567-2.848l112.204-112.209l112.208,112.209c1.902,1.903,4.093,2.852,6.563,2.852
                        c2.478,0,4.668-0.948,6.57-2.852l14.274-14.276c1.902-1.903,2.847-4.093,2.847-6.564c0-2.478-0.951-4.667-2.847-6.57
                        L149.028,117.055z"/>
									</g>
								</svg>
								}
							/>
							<RaisedButton
								label={__('Downloads')}
								id='downloadTab'
								onClick={() => {
									window.router('/downloads')
								}}
								backgroundColor='#2080E4'
								labelColor='white'
								style={{height: 60, borderRadius: 6, margin: 5, zIndex: 1}}
								buttonStyle={{borderRadius: 5}}
								icon={<svg fill='white' style={{height: 30}} viewBox="0 0 548.176 548.176">
									<path d="M524.326,297.352c-15.896-19.89-36.21-32.782-60.959-38.684c7.81-11.8,11.704-24.934,11.704-39.399
                      c0-20.177-7.139-37.401-21.409-51.678c-14.273-14.272-31.498-21.411-51.675-21.411c-18.083,0-33.879,5.901-47.39,17.703
                      c-11.225-27.41-29.171-49.393-53.817-65.95c-24.646-16.562-51.818-24.842-81.514-24.842c-40.349,0-74.802,14.279-103.353,42.83
                      c-28.553,28.544-42.825,62.999-42.825,103.351c0,2.474,0.191,6.567,0.571,12.275c-22.459,10.469-40.349,26.171-53.676,47.106
                      C6.661,299.594,0,322.43,0,347.179c0,35.214,12.517,65.329,37.544,90.358c25.028,25.037,55.15,37.548,90.362,37.548h310.636
                      c30.259,0,56.096-10.711,77.512-32.12c21.413-21.409,32.121-47.246,32.121-77.516C548.172,339.944,540.223,317.248,524.326,297.352
                      z M362.595,308.344L262.38,408.565c-1.711,1.707-3.901,2.566-6.567,2.566c-2.664,0-4.854-0.859-6.567-2.566L148.75,308.063
                      c-1.713-1.711-2.568-3.901-2.568-6.567c0-2.474,0.9-4.616,2.708-6.423c1.812-1.808,3.949-2.711,6.423-2.711h63.954V191.865
                      c0-2.474,0.905-4.616,2.712-6.427c1.809-1.805,3.949-2.708,6.423-2.708h54.823c2.478,0,4.609,0.9,6.427,2.708
                      c1.804,1.811,2.707,3.953,2.707,6.427v100.497h63.954c2.665,0,4.855,0.855,6.563,2.566c1.714,1.711,2.562,3.901,2.562,6.567
                      C365.438,303.789,364.494,306.064,362.595,308.344z"/>
								</svg>
								}
							/>
							<RaisedButton
								label={__('Activity')}
								onClick={() => {
									window.router('/activity')
								}}
								backgroundColor='#2a5cba'
								labelColor='white'
								style={{height: 60, width: 160, borderRadius: 5, margin: 5, zIndex: 1}}
								buttonStyle={{borderRadius: 5}}
								icon={<svg fill='white' style={{height: 30}} viewBox="0 0 352.352 352.352">
									<g>
										<path d="M255.432,37.172c-7.956-15.3-20.808-28.152-36.107-36.108c-4.284-2.448-10.404-0.612-11.628,4.896
                        c-1.225,4.284-3.061,8.568-4.896,12.24C153.84-4.444,95.699,20.036,58.979,54.308c-41.616,39.168-62.424,102.816-45.9,157.896
                        c1.837,7.344,12.24,4.283,11.017-3.061c-7.956-51.408,6.12-99.756,40.392-138.924c37.332-42.228,82.008-45.9,133.416-40.392
                        c-1.224,3.672-1.836,7.344-1.836,11.016c0,3.06,1.225,4.896,3.673,5.508c0,1.224,0,3.06,0.611,4.284
                        c3.672,7.956,12.853,6.732,20.196,5.508c11.016-1.224,22.644-3.672,32.436-8.568C256.656,45.74,257.268,40.231,255.432,37.172z
                        M210.144,40.844c-0.611,0-1.224,0-2.447,0c1.224-7.344,5.508-14.688,9.791-22.032c7.345,4.896,13.465,11.016,18.973,18.36
                        c-5.508,1.836-11.017,2.448-16.524,3.06C216.876,40.844,213.204,40.844,210.144,40.844z"/>
										<path d="M297.048,318.08c58.752-74.664,80.172-204.408-9.18-265.608c-5.509-3.672-11.628,4.896-6.732,9.18
                        c71.604,67.32,63.036,173.196,4.896,246.636c-1.836-1.837-4.284-3.061-6.12-4.284c0-6.12-7.956-11.017-12.853-5.508
                        c-11.016,12.239-14.688,27.539-18.972,43.451c-1.224,4.896,2.448,10.404,7.956,10.404c17.136,0,34.884-3.672,50.796-11.016
                        c4.284-2.448,4.896-9.181,1.836-12.24C303.78,324.812,300.72,321.752,297.048,318.08z M273.18,314.407
                        c5.508,4.896,10.404,10.404,15.3,15.912c-7.344,2.448-15.3,3.672-23.256,4.896C267.06,327.872,269.508,320.527,273.18,314.407z"/>
										<path d="M219.936,321.14c-36.72,14.076-63.648,15.912-100.979-0.612c-27.54-12.239-51.408-31.212-71.604-52.02
                        c4.896-3.672,9.792-7.344,15.3-11.016c4.896-3.673,4.896-9.793,0-13.465c-13.464-9.18-29.376-16.523-45.288-20.808
                        c-4.284-1.224-8.567,1.224-9.792,5.508c-3.06,11.017-4.284,21.42-2.447,33.048c1.224,7.956,5.508,20.809,13.464,24.48
                        c3.672,1.836,9.792,0,9.18-5.508l0,0c3.06-1.836,6.12-3.061,9.18-4.896c19.584,28.764,51.408,50.796,83.232,63.036
                        c30.6,12.24,80.784,22.644,105.264-7.344C229.728,327.26,226.668,318.691,219.936,321.14z M21.035,260.552
                        c-1.836-6.732-1.224-13.464,0-19.584c9.181,3.06,17.748,7.344,26.316,12.24c-6.732,6.731-14.688,11.628-22.644,17.136
                        C23.483,266.06,21.647,263.611,21.035,260.552z"/>
									</g>
								</svg>
								}
							/>
							{
							dialog &&
							<ContextMenu rightAlign={true} style={{zIndex: 1}} onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
								}} menu={[
									{name: __('File'), click: () => this.generateTorrent(false)},
									{name: __('Folder'), click: () => this.generateTorrent(true)},
							]}>
								<RaisedButton
									label={__('Generate')}
									backgroundColor='#eb9534'
									labelColor='white'
									style={{height: 60, borderRadius: 5, margin: 5, zIndex: 1}}
									buttonStyle={{borderRadius: 5}}
									icon={
										<svg fill='white' style={{height: 30}} viewBox="0 0 512 512"><path d="m437.02 74.98c-48.352-48.351-112.64-74.98-181.02-74.98s-132.668 26.629-181.02 74.98c-48.351 48.352-74.98 112.64-74.98 181.02s26.629 132.668 74.981 181.02c3.585 3.585 8.533 4.965 13.176 4.161.007.001.01.008.019.007l121.199-21.227c3.038-.532 5.838-1.987 8.019-4.168l194.918-194.919c5.858-5.858 5.858-15.355 0-21.213l-99.986-99.986c-5.857-5.858-15.355-5.858-21.213 0l-194.919 194.919c-2.182 2.181-3.637 4.982-4.169 8.02l-15.814 90.361c-29.97-39.169-46.211-86.821-46.211-136.975 0-124.617 101.383-226 226-226s226 101.383 226 226-101.383 226-226 226c-8.284 0-15 6.716-15 15s6.716 15 15 15c68.38 0 132.668-26.629 181.02-74.98 48.351-48.352 74.98-112.64 74.98-181.02s-26.629-132.668-74.98-181.02zm-320.419 261.234 59.176 59.175-71.73 12.563zm90.185 47.759-28.773-28.773 173.705-173.705 28.773 28.773zm94.933-252.478 28.787 28.787-173.706 173.705-28.786-28.787z"/></svg>
									}
								/>
							</ContextMenu>
							}
							<div className='fs0-85 pad0-75 column search-panel' style={{
								marginLeft: 'auto', 
								marginTop: '-10px',
								paddingLeft: 15,
								zIndex: 2
							}}>
								<Search />
							</div>
						</div>
					</CardMedia>
				</Card>
				<div className='clear-header-space' style={{transition: '1.0s'}} />
			</div>
		)

	}
}

export {Header}
