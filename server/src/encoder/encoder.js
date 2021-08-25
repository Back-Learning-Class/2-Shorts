// 암호화를 위한 bcrypt 모듈 
import bcrypt from 'bcrypt'


// 솔팅 반복횟수 
const saltRounds = 102149;

// 암호화 함수 
export async function doEncode(beforePassword){
    try {
        let hash = await bcrypt.hash(beforePassword, saltRounds);
        // bcrypt는 Promise 객체를 return 
        // async / await 사용 가능 
        return hash;
    } catch ( error ){
        console.log(error);
    }
}

//암호 일치 확인
export function doCompare(inputMessage, hash){
    try {
        let compareResult = bcrypt.compare(inputMessage, hash)
        // bcrypt는 Promise 객체를 return 
        // async / await 사용 가능 
        
        return compareResult;
        // true false 를 return
    } catch ( error ) {
        console.log(error);
    }   
}
