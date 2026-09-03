function GetData(dataId){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("data",dataId);
          resolve("successfull");
        }, 8000);
    });
}

let r = GetData(123);
const GetPromise = () => {
    return new Promise((resolve, reject) => {
        console.log("i m a promise");
        resolve("successfull");
    });
};

let promise = GetPromise();
promise.then(() => {
    console.log("promise is fulfilled");
});

promise.catch(()=>{
    console.log("promise is not working properly");
})