import React from 'react'

const ExtLinks = ( { externalLinks } ) => {
  return (
    <div className="overview_elements">
            <div className='pb-5 mb-1em sidebar_det_title' ref={(ref) => (window.targetComponentRef = ref)}>External & Streaming links</div>
            <div className="streamlink_wrapper">
              {
               externalLinks.map(({url,site,icon,color,notes,language},index)=>
                    <a href={url} target='_blank' style={{ textDecoration: "none",}} key={index}>
                        <div
                            style={{ '--hover-color':color}} 
                            className={icon ?'link_det_wrapper':'link_det_wrapper nolink' }
                        >
                            {icon &&  
                                  <div className="icon_wrapper">
                                      <img 
                                          onLoad={(e)=>e.target.style.opacity=1} 
                                          src={icon} alt="Site Icon" className="icon_image" 
                                      />
                                  </div>
                            }
                            {
                              !icon && 
                                  <div className="nolink_icon_wrapper">
                                  <i className="fa-solid fa-link"></i>
                                </div>
                            }
                            <div className="link_name">
                              {site} 
                              {notes && <span className='notes'>({notes})</span>}
                              {language && <span className='notes'>{language.substr(0,2).toUpperCase()}</span>}
                            </div>
                        </div>
                    </a>
                )
              }
            </div>
          </div>
  )
}

export default ExtLinks
