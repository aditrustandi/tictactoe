var p1 = "X",
    p2 = "O",
    count = 0,
    val_x = [];



$('#go').click(
    ()=>{
        let val = $('#dimensi-box').val(),
            versus = $('#versus').val();

        val_x = [];
        $('#versus_key').val(versus)
        count = 0;
        if (val > 2 && val < 11) {
            $('#wrapper').html('');
            $('#alert').fadeOut(300)
            for (let index = 0; index < val; index++) {


                $('#wrapper').append(
                    ()=>{
                        var $btn_wrap = $("<div class='btn-wrap'></div>");
                        
                        for (let indexTwo = 0; indexTwo < val; indexTwo++) {
                            $btn_wrap.append(
                                "<button id='"+index+indexTwo+"' r="+index+" c="+indexTwo+" class='btn-box' onclick='btnBoxClicked(\""+index+indexTwo+"\")'>~</button>"
                            )

                            
                        }


                        return $btn_wrap
                    }
                );
                
            }
            
                
        }else{
            $('#alert').html("Board scale must be 1 to 10")
            $('#alert').fadeIn(300)
        }
        
    }
)

function btnBoxClicked(v)
{
    let el = $('#'+v);

    if (el.html() === '~') {
        count = count+1;

        if (isP2(count, v)) {
            
            var p = p2,
                style = 'warn';

                el.addClass(p);
                el.addClass(style);
                el.html(p);
                
        }
    
        if (isP1(count, v)) {
            var p = p1,
                style = 'skyblue';

                el.addClass(p);
                el.addClass(style);
                el.html(p);

                let versus_key = $('#versus').val();

                if (versus_key === 'COMPUTER') {
                    computerTurn()
                    
                }
        }
        
        let horizontalC = checkHorizontalCenter(p, v),
            horizontalL = checkHorizontalLeft(p, v),
            horizontalR = checkHorizontalRight(p, v),

            verticalC = checkVerticalCenter(p, v),
            verticalT = checkVerticalTop(p, v),
            verticalB = checkVerticalBottom(p, v),


            traverseFromLeftC = checkTraverseFromLeftCenter(p, v),
            traverseFromLeftT = checkTraverseFromLeftTop(p, v),
            traverseFromLeftB = checkTraverseFromLeftBottom(p, v),

            traverseFromRightC = checkTraverseFromRightCenter(p, v),
            traverseFromRightT = checkTraverseFromRightTop(p, v),
            traverseFromRightB = checkTraverseFromRightBottom(p, v);

        var btn_box = document.getElementsByClassName('btn-box'),
            checkingDraw = [];

        for (let index = 0; index < btn_box.length; index++) {
            let btn_id = btn_box[index].id

            let text = document.getElementById(btn_id).textContent;
            checkingDraw.push(text);
            
        }

        if (checkingDraw.includes('~') === false) {
            $('#alert').html("Draw !")
            $('#alert').fadeIn(300)

            for (let index = 0; index < btn_box.length; index++) {
                btn_box[index].disabled = true;
            }
        }
        

        if (horizontalC === true || 
            horizontalL === true || 
            horizontalR === true || 
            verticalB === true || 
            verticalC === true || 
            verticalT === true || 
            traverseFromLeftC === true ||
            traverseFromLeftT === true ||
            traverseFromLeftB === true ||
            traverseFromRightC === true ||
            traverseFromRightT === true ||
            traverseFromRightB === true) {

            $('#alert').html(p+" win !")
            $('#alert').fadeIn(300)

            for (let index = 0; index < btn_box.length; index++) {
                btn_box[index].disabled = true;
            }
        }
        
        
        
        
    }

}



function isP2(n, v) {
    return n % 2 == 0;
 }
 
 function isP1(n, v) {
    return Math.abs(n % 2) == 1;
 }

 function computerTurn()
 {
     let availableBox = [],
        btn_box = document.getElementsByClassName('btn-box');

        for (let index = 0; index < btn_box.length; index++) {
            let btn_id = btn_box[index].id

            let text = document.getElementById(btn_id).textContent;
            
            if (text === '~') {
                availableBox.push(btn_id)
            }
        }

        let v = availableBox[Math.floor(Math.random() * availableBox.length)];

        btnBoxClicked(v)
 }

 function checkTraverseFromRightBottom(p, v)
 {
    let firstDigit = parseInt(v.charAt(0)),
        lastDigit = parseInt(v.charAt(1)),
        maxNum = parseInt($('.btn-box:last').attr('c'));

    if (firstDigit-2 < 0) {
        return false
    }else if(lastDigit+2 > maxNum){
        return false
    } else{
        let centerBoxRightLD = firstDigit-1,
            centerBoxRightRD = lastDigit+1,
            centerBoxRightID = ""+centerBoxRightLD+""+centerBoxRightRD+"";

        let centerBoxRightLDNext = firstDigit-2,
            centerBoxRightRDNext = lastDigit+2,
            centerBoxRightIDNext = ""+centerBoxRightLDNext+""+centerBoxRightRDNext+"";

        if ($('#'+centerBoxRightID).hasClass(p) === $('#'+centerBoxRightIDNext).hasClass(p) && $('#'+v).hasClass(p) === $('#'+centerBoxRightID).hasClass(p) && $('#'+centerBoxRightIDNext).hasClass(p) === $('#'+v).hasClass(p)) {
            return true;
        }else{
            return false;
        } 
    }
 }

 function checkTraverseFromRightTop(p, v)
 {
    let firstDigit = parseInt(v.charAt(0)),
        lastDigit = parseInt(v.charAt(1)),
        maxNum = parseInt($('.btn-box:last').attr('c'));

        if (firstDigit+2 > maxNum) {
            return false
        }else if(lastDigit-2 < 0)
        {
            return false
        }else{

            let centerBoxLeftLD = firstDigit+1,
                centerBoxLeftRD = lastDigit-1,
                centerBoxLeftID = ""+centerBoxLeftLD+""+centerBoxLeftRD+"";

            let centerBoxLeftLDNext = firstDigit+2,
                centerBoxLeftRDNext = lastDigit-2,
                centerBoxLeftIDNext = ""+centerBoxLeftLDNext+""+centerBoxLeftRDNext+"";

            if ($('#'+centerBoxLeftID).hasClass(p) === $('#'+centerBoxLeftIDNext).hasClass(p) && $('#'+v).hasClass(p) === $('#'+centerBoxLeftID).hasClass(p) && $('#'+centerBoxLeftIDNext).hasClass(p) === $('#'+v).hasClass(p)) {
                return true;
            }else{
                return false;
            }   

        }
 }

 function checkTraverseFromRightCenter(p, v)
 {
    let firstDigit = parseInt(v.charAt(0)),
        lastDigit = parseInt(v.charAt(1)),
        maxNum = parseInt($('.btn-box:last').attr('c'));

    if (firstDigit-1 < 0) {
        return false
    }else if(lastDigit+1 > maxNum){
        return false
    }else if(firstDigit+1 > maxNum){
        return false
    }else if(lastDigit-1 < 0){
        return false
    }else{
        
        let topBoxRightLD = firstDigit-1,
            topBoxRightRD = lastDigit+1,
            topBoxRightID = ""+topBoxRightLD+""+topBoxRightRD+"";

        let bottomBoxLefttLD = firstDigit+1,
            bottomBoxLeftRD = lastDigit-1,
            bottomBoxLeftID = ""+bottomBoxLefttLD+""+bottomBoxLeftRD+"";

        
        if ($('#'+topBoxRightID).hasClass(p) === $('#'+bottomBoxLeftID).hasClass(p) && $('#'+v).hasClass(p) === $('#'+topBoxRightID).hasClass(p) && $('#'+bottomBoxLeftID).hasClass(p) === $('#'+v).hasClass(p)) {
            return true;
        }else{
            return false;
        }     

    }
 }

 function checkTraverseFromLeftBottom(p, v)
 {
    let firstDigit = parseInt(v.charAt(0)),
        lastDigit = parseInt(v.charAt(1));

        if (firstDigit-2 < 0) {
            return false
        }else if(lastDigit-2 < 0){
            return false
        }else{
            let topBoxLeftLD = firstDigit-1,
                topBoxLeftRD = lastDigit-1,
                topBoxLeftID = ""+topBoxLeftLD+""+topBoxLeftRD+"";

            let topBoxLeftLDNext = firstDigit-2,
                topBoxLeftRDNext = lastDigit-2,
                topBoxLeftIDNext = ""+topBoxLeftLDNext+""+topBoxLeftRDNext+"";

            if ($('#'+topBoxLeftID).hasClass(p) === $('#'+topBoxLeftIDNext).hasClass(p) && $('#'+v).hasClass(p) === $('#'+topBoxLeftID).hasClass(p) && $('#'+topBoxLeftIDNext).hasClass(p) === $('#'+v).hasClass(p)) {
                return true;
            }else{
                return false;
            }
        }
 }

 function checkTraverseFromLeftTop(p, v)
 {
    let firstDigit = parseInt(v.charAt(0)),
        lastDigit = parseInt(v.charAt(1)),
        maxNum = parseInt($('.btn-box:last').attr('c'));

    if (firstDigit+2 > maxNum) {
        return false
    }else{
        let centerBoxRightLD = firstDigit+1,
            centerBoxRightRD = lastDigit+1,
            centerBoxRighID = ""+centerBoxRightLD+""+centerBoxRightRD+"";
        
        let bottomBoxRightLD = firstDigit+2,
            bottomBoxRightRD = lastDigit+2,
            bottomBoxRightID = ""+bottomBoxRightLD+""+bottomBoxRightRD+"";

        if ($('#'+centerBoxRighID).hasClass(p) === $('#'+bottomBoxRightID).hasClass(p) && $('#'+v).hasClass(p) === $('#'+centerBoxRighID).hasClass(p) && $('#'+bottomBoxRightID).hasClass(p) === $('#'+v).hasClass(p)) {
            return true;
        }else{
            return false;
        }
    }
 }

function checkTraverseFromLeftCenter(p, v)
{
    let firstDigit = parseInt(v.charAt(0)),
        lastDigit = parseInt(v.charAt(1)),
        maxNum = parseInt($('.btn-box:last').attr('c'));

    if (firstDigit-1 < 0) {
        return false;
    }else if(lastDigit-1 < 0){
        return false;
    }else if(firstDigit+1 > maxNum){
        return false;
    }else if(lastDigit+1 > maxNum){
        return false;
    } else{
        
        let topBoxLeftLD = firstDigit-1,
            topBoxLeftRD = lastDigit-1,
            topBoxLeftID = ""+topBoxLeftLD+""+topBoxLeftRD+"";

        let btmBoxRightLD = firstDigit+1,
            btmBoxRightRD = lastDigit+1,
            btmBoxRightID = ""+btmBoxRightLD+""+btmBoxRightRD+"";

        if ($('#'+topBoxLeftID).hasClass(p) === $('#'+btmBoxRightID).hasClass(p) && $('#'+v).hasClass(p) === $('#'+topBoxLeftID).hasClass(p) && $('#'+btmBoxRightID).hasClass(p) === $('#'+v).hasClass(p)) {
            return true;
        }else{
            return false; 
        }
    }
    
}

 function checkVerticalBottom(p, v)
 {
    let firstDigit = parseInt(v.charAt(0)),
        lastDigit = parseInt(v.charAt(1));

    if (firstDigit-2 < 0) {
        return false
    }else{
        
        let topBoxRD = firstDigit-1,
            topBoxID = ""+topBoxRD+""+lastDigit+"";

        let topBoxRDNext = firstDigit-2,
            topBoxIDNext = ""+topBoxRDNext+""+lastDigit+"";
            
       
        if ($('#'+topBoxID).hasClass(p) === $('#'+topBoxIDNext).hasClass(p) && $('#'+v).hasClass(p) === $('#'+topBoxID).hasClass(p) && $('#'+topBoxIDNext).hasClass(p) === $('#'+v).hasClass(p)) {
            return true;
        }else{
            return false; 
        }

    }
 }

 function checkVerticalTop(p, v)
 {
    let firstDigit = parseInt(v.charAt(0)),
        lastDigit = parseInt(v.charAt(1)),
        maxNum = parseInt($('.btn-box:last').attr('c'));

        if (firstDigit+2 > maxNum) {
            return false;
        }else{
            let btmBoxLD = firstDigit+1,
                btmBoxID = ""+btmBoxLD+""+lastDigit+"";
            
            let btmBoxLDNext = firstDigit+2,
                btmBoxIDNext = ""+btmBoxLDNext+""+lastDigit+"";

            
            if ($('#'+btmBoxIDNext).hasClass(p) === $('#'+btmBoxID).hasClass(p) && $('#'+v).hasClass(p) === $('#'+btmBoxID).hasClass(p) && $('#'+btmBoxIDNext).hasClass(p) === $('#'+v).hasClass(p)) {
                return true;
            }else{
                return false; 
            }
        };
 }

 function checkVerticalCenter(p, v)
 {
    let firstDigit = parseInt(v.charAt(0)),
        lastDigit = parseInt(v.charAt(1)),
        maxNum = parseInt($('.btn-box:last').attr('c'));

    if (firstDigit-1 < 0) {
        return false;
    } else if(firstDigit === maxNum){
        return false;
    }else{

        let topBoxRD = firstDigit-1,
            topBoxID = ""+topBoxRD+""+lastDigit+"";

        let btmBoxRD = firstDigit+1,
            btmBoxID = ""+btmBoxRD+""+lastDigit+"";

            if ($('#'+topBoxID).hasClass(p) === $('#'+btmBoxID).hasClass(p) && $('#'+v).hasClass(p) === $('#'+btmBoxID).hasClass(p) && $('#'+topBoxID).hasClass(p) === $('#'+v).hasClass(p)) {
                return true;
            }else{
                return false; 
            }
    }
 }

 function checkHorizontalRight(p, v)
 {
    let firstDigit = parseInt(v.charAt(0)),
        lastDigit = parseInt(v.charAt(1)),
        minNum = parseInt($('.btn-box:first').attr('c'));

    if (lastDigit === minNum) {
        return false
    }else if(lastDigit-2 < minNum){
        return false;
    }else{
        
        let leftBoxLD = lastDigit-1,
            leftBoxID = ""+firstDigit+""+leftBoxLD+"";

        let leftBoxLDNext = lastDigit-2,
            leftBoxIDNext = ""+firstDigit+""+leftBoxLDNext+"";


        if ($('#'+leftBoxID).html() === '~' && $('#'+leftBoxIDNext).html() === '~') {
            return false;
        }else{ 

            if ($('#'+leftBoxID).hasClass(p) === $('#'+leftBoxIDNext).hasClass(p) && $('#'+v).hasClass(p) === $('#'+leftBoxIDNext).hasClass(p) && $('#'+leftBoxID).hasClass(p) === $('#'+v).hasClass(p)) {
                return true;
            }else{
                return false;
            }

        }

    }
 }

 function checkHorizontalLeft(p, v)
 {
    let firstDigit = parseInt(v.charAt(0)),
        lastDigit = parseInt(v.charAt(1)),
        maxNum = parseInt($('.btn-box:last').attr('c'));

        if (lastDigit === maxNum) {
            return false
        }else if(lastDigit+2 > maxNum){
            return false
        }else{
            
            let rightBoxLD = lastDigit+1,
                rightBoxID = ""+firstDigit+""+rightBoxLD+"";

            let rightBoxLDNext = lastDigit+2,
                rightBoxIDNext = ""+firstDigit+""+rightBoxLDNext+"";


            if ($('#'+rightBoxID).html() === '~' && $('#'+rightBoxIDNext).html() === '~') {
                return false;
            }else{ 

                if ($('#'+rightBoxID).hasClass(p) === $('#'+rightBoxIDNext).hasClass(p) && $('#'+v).hasClass(p) === $('#'+rightBoxIDNext).hasClass(p) && $('#'+rightBoxID).hasClass(p) === $('#'+v).hasClass(p)) {
                    return true;
                }else{
                    return false;
                }

            }
        }
 }

 function checkHorizontalCenter(p, v)
 {
    let firstDigit = parseInt(v.charAt(0)),
        lastDigit = parseInt(v.charAt(1)),
        maxNum = parseInt($('.btn-box:last').attr('c'));

        if (lastDigit-1 < 0) {
            return false
        }else if(lastDigit === maxNum){
            return false;
        }else{
            
            let leftBoxLD = lastDigit-1,
                leftBoxID = ""+firstDigit+""+leftBoxLD+"";
            
            let rightBoxLD = lastDigit+1,
                rightBoxID = ""+firstDigit+""+rightBoxLD+"";

            if ($('#'+rightBoxID).html() === '~' && $('#'+leftBoxID).html() === '~') {
                return false;
            }else{
                
                if ($('#'+rightBoxID).hasClass(p) === $('#'+leftBoxID).hasClass(p) && $('#'+v).hasClass(p) === $('#'+leftBoxID).hasClass(p) && $('#'+rightBoxID).hasClass(p) === $('#'+v).hasClass(p)) {
                    return true;
                }else{
                    return false;
                }

            }

        }
 }
