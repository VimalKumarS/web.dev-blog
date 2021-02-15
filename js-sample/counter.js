 function animationInterval(ms, signal, callback) {
     const start = document.timeline.currentTime;

     function frame(time) {
         if (signal.aborted) {
             return;
         }
         callback(time);
         scheduleFrame(time);
     }

     function scheduleFrame(time) {
         const elapsed = time - start;
         const roundedElapsed = Math.round(elapsed / ms) * ms;
         const targetNext = start + roundedElapsed + ms;
         const delay = targetNext - performance.now();
         setTimeout(() => requestAnimationFrame(frame), delay);
     }
     scheduleFrame(start);
 }

 ///ussage
 //import { animationInterval } from './1.js';

 //const controller = new AbortController();

 // Create an animation callback every second:
 // animationInterval(1000, controller.signal, time => {
 //   console.log('tick!', time);
 // });
 animationInterval(1000, null, time => {
     console.log('tick!', time);
 });

 // And to stop it:
 //controller.abort();

 //react
 import { animationInterval } from './animationInterval'
 const useAnimationFrame = (ms, callback) => {
     const callbackRef = useRef(callback)
     useEffect(() => {
         callbackRef.current = callback
     }, [callback])

     useEffect(() => {
         const controller = new AbortController()
         animationInterval(ms, controller.signal, callbackRef.current)
         return () => controller.abort()
     }, [ms])
 }

 // usage
 useAnimationFrame(1000, () => setVisible(x => !x))


 //ref https://gist.github.com/jakearchibald/cb03f15670817001b1157e62a076fe95