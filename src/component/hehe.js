const a =()=> {
    const b=10;
    function callback(i){
        console.log(i)
    }
    function hehe( callback ) {
        const item=100;
        callback(100)
        
    }
    hehe(callback);
}
a()
