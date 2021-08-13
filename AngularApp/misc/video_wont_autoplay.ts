        // make the video autoplay
        of({})
        .pipe(
            delay(3000),
            // tap(()=>{
            //     eventDispatcher({
            //         element:(document.querySelector(".a_p_p_OverlayImg")as HTMLVideoElement),
            //         event:"play"
            //     })
            // })
        )
        .subscribe();

        fromEvent(document.querySelector(".a_p_p_OverlayImg") as HTMLVideoElement,"play")
        .subscribe({
            next:console.log,
            error:console.error
        })
        //
