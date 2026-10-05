import React from 'react'

export const PosterSkeleton = ({ dark }) => (
    <div className='mx-2' aria-hidden>
        <div className={`sk ${dark ? 'sk-dark' : ''}`} style={{ height: "216px", width: "162px", margin: "auto", borderRadius: "15px" }} />
        <div className={`sk ${dark ? 'sk-dark' : ''}`} style={{ height: "12px", width: "110px", margin: "12px auto 0", borderRadius: "6px" }} />
    </div>
)

export const SpotlightSkeleton = () => (
    <div className='container' aria-hidden>
        <div className='row px-3 align-items-center'>
            <div className='col-lg-auto mb-3 d-flex justify-content-center'>
                <div className='sk' style={{ height: "360px", width: "240px", borderRadius: "12px" }} />
            </div>
            <div className='col-lg'>
                <div className='sk' style={{ height: "28px", width: "60%", borderRadius: "8px" }} />
                {[100, 95, 90, 70].map((w) => (
                    <div key={w} className='sk' style={{ height: "12px", width: `${w}%`, borderRadius: "6px", marginTop: "14px" }} />
                ))}
                <div className='d-flex mt-4'>
                    {[90, 60, 80, 90].map((w, i) => (
                        <div key={i} className='sk me-2' style={{ height: "36px", width: `${w}px`, borderRadius: "12px" }} />
                    ))}
                </div>
            </div>
        </div>
    </div>
)

export const ErrorRow = ({ message, onRetry, dark }) => (
    <div className={`text-center py-4 ${dark ? 'text-white' : 'text-dark'}`} style={{ fontFamily: "Roboto, sans-serif" }}>
        <p className='mb-2'>{message || "Couldn't load this section."}</p>
        {onRetry && <button type="button" className="btn btn-sm btn-outline-success" onClick={onRetry}>Try again</button>}
    </div>
)
