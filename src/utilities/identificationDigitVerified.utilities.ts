
export const identificationDigitVerified = ( myNit: string ): number => {
    try {
        let vpri: any, x: number, y: any, z: number;
        myNit = myNit.replace ( /\s/g, "" ) ; // Espacios
        myNit = myNit.replace ( /,/g,  "" ) ; // Comas
        myNit = myNit.replace ( /\./g, "" ) ; // Puntos
        myNit = myNit.replace ( /-/g,  "" ) ; // Guiones
        
        // Procedimiento
        vpri = new Array(16); 
        z = myNit.length;
        
        vpri[1]  =  3 ;
        vpri[2]  =  7 ;
        vpri[3]  = 13 ; 
        vpri[4]  = 17 ;
        vpri[5]  = 19 ;
        vpri[6]  = 23 ;
        vpri[7]  = 29 ;
        vpri[8]  = 37 ;
        vpri[9]  = 41 ;
        vpri[10] = 43 ;
        vpri[11] = 47 ;  
        vpri[12] = 53 ;  
        vpri[13] = 59 ; 
        vpri[14] = 67 ; 
        vpri[15] = 71 ;
        
        x = 0 ;
        y = 0 ;
        for  ( let i = 0; i < z; i++ )  { 
            y = ( myNit.substr( i, 1 ) ) ;
            x += ( y * vpri [z-i] ) ;
        };
        y = x % 11 ;
        return( y > 1 ) ? 11 - y : y 
    } catch (error) {
        // console.log(error);
        return NaN
    };
};