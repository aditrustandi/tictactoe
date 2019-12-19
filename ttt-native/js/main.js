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
        if (val > 2) {
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
            $('#alert').html("Board scale must be greather than 3")
            $('#alert').fadeIn(300)
        }
        
    }
)

function btnBoxClicked(v)
{
    let el = $('#'+v);

    if (el.html() === '~') {
        count = count+1;
        let res = [];

        if (isP2(count)) {
            
            var p = p2,
                style = 'warn';

                el.addClass(p);
                el.addClass(style);
                el.html(p);
                
        }
    
        if (isP1(count)) {
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

            verticalC = checkVerticalCenter(p, v),

            traverseFromLeftC = checkTraverseFromLeftCenter(p),

            traverseFromRightC = checkTraverseFromRightCenter(p)

        var btn_box = document.getElementsByClassName('btn-box'),
            checkingDraw = [];

        for (let index = 0; index < btn_box.length; index++) {
            let btn_id = btn_box[index].id

            let text = document.getElementById(btn_id).textContent;
            checkingDraw.push(text);
            
        }

        res = [
            horizontalC,
            verticalC,
            traverseFromLeftC,
            traverseFromRightC
        ]

        
        if (checkingResult(res) !== false) {
            
            if (checkingResult(res).length > 1) {
                $('#alert').html(p+" win with "+checkingResult(res).length+" combos !")
            }else{
                $('#alert').html(p+" win !")
            }

            $('#alert').fadeIn(300)

            for (let index = 0; index < btn_box.length; index++) {
                btn_box[index].disabled = true;
            }
        }else{
            if (checkingDraw.includes('~') === false) {
                $('#alert').html("Draw !")
                $('#alert').fadeIn(300)

                for (let index = 0; index < btn_box.length; index++) {
                    btn_box[index].disabled = true;
                }
            }
        }
        
        
    }

}



function isP2(n) {
    return n % 2 == 0;
 }
 
 function isP1(n) {
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

 function checkingResult(arr)
 {
     if (arr.includes(true) === true) {
        let finalResult = removeA(arr, false);

        return finalResult
     }else{
         return false
     }
 }

function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {

        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }

    }

    return arr;
}


function checkTraverseFromLeftCenter(p)
{
    let minNum = parseInt($('.btn-box:first').attr('c')),
        val = $('#dimensi-box').val(),
        res = [];


        for (let index = 0; index < val; index++) {
            let d = minNum+index;

                checkBox = $('#'+d+""+d+"");

                res.push(checkBox.hasClass(p))
            
        }

        if (res.includes(false) === false) {
            return true;
        }else{
            return false;
        }

    
}

function checkTraverseFromRightCenter(p)
 {
    let minNum = parseInt($('.btn-box:first').attr('c')),
        maxNum = parseInt($('.btn-box:last').attr('c')),
        val = $('#dimensi-box').val(),
        res = [];


        for (let index = 0; index < val; index++) {
            let fd = minNum+index,
                ld = maxNum-index,
                checkBox = $('#'+fd+""+ld+"");

                res.push(checkBox.hasClass(p))
            
        }

        if (res.includes(false) === false) {
            return true;
        }else{
            return false;
        }
 }

 function checkVerticalCenter(p, v)
 {
    let lastDigit = parseInt(v.charAt(1)),
        val = $('#dimensi-box').val(),
        res = [];

        for (let index = 0; index < val; index++) {
            let checkBox = $('#'+index+""+lastDigit+"")

            res.push(checkBox.hasClass(p))
            
        }
        
        if (res.includes(false) === false) {
            return true;
        }else{
            return false;
        }
 }


 function checkHorizontalCenter(p, v)
 {
    let firstDigit = parseInt(v.charAt(0)),
        val = $('#dimensi-box').val(),
        res = [];

        for (let index = 0; index < val; index++) {
            let checkBox = $('#'+firstDigit+""+index+"")

            res.push(checkBox.hasClass(p))
            
        }
        
        if (res.includes(false) === false) {
            return true;
        }else{
            return false;
        }
 }
