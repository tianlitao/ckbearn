// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import { Modal } from 'flowbite';
import "@hotwired/turbo-rails"
// import { authWithPopup } from '@joyid/joyid.js'
// import "controllers"
import $ from "jquery";
import 'jquery.cookie'
import Wallets, { chainIdHexToNumber } from 'wallet-sdk-js'

$(document).on('click', '#user-login-joyid',function(){
    joyID.authWithPopup({
        redirectURL: location.origin + '/',
        name: 'CKBEarn',
        logo: 'https://ckbearn.xyz/assets/logo2.png',
    }).then((res) => {
        if (res.error == null) {
            $.ajax({
                url: 'home/login_in',
                method: 'post',
                data: res.data,
                success(data){
                    location.reload()
                }
            })
        }else{
            console.log('login fail!')
        }
    })
})

$(document).on('click', '#joyid-bet-button',function(){
    joyCKB.signTransaction({
        to: $.cookie('contract_address'),
        from: $.cookie('address'),
        amount: BigInt(Number(1000) * 10 ** 8).toString(),
    }).then((res) => {
        $.ajax({
            url: '/api/v1/ckbulls/joy_tran',
            type: 'post',
            data: res,
            success: function (data){
                if(data.success){
                    $('#tip_a').attr({
                        href: 'https://pudge.explorer.nervos.org/transaction/' + data.tx,
                        text: data.tx
                    })
                    $('#alert-tip').show();
                }else{
                    alert(data.message)
                }
            }
        })
        console.log(res)
        if (res.error == null) {
        }else{
            console.log('login fail!')
        }
    })
})

function requestData() {
    if($.cookie('signInToken')){
        $.ajax({
            url: '/api/v1/ckbulls/check_status' ,
            type: 'post',
            data: {sign_in_token: $.cookie('signInToken')},
            success: function(response) {
                if(response.status == 'signed') {
                    $.cookie('address', response.address)
                    $.cookie('network', response.chain)
                    // 数据成功返回,刷新页面
                    window.location.reload();
                } else {
                    // 数据还没准备好,隔一段时间后递归调用自身
                    setTimeout(requestData, 2000);
                }
            }
        });
    }
}

$(document).on('click', '#user-login',function(){
    $.ajax({
        url: "/api/v1/ckbulls/get_sign_in_token", // 后端接口的URL
        type: "post", // 请求方法（GET、POST等）
        success: function(response) {
            // 请求成功的回调函数
            // 在这里处理返回的内容
            var qrCodeUrl = response.signInToken; // 假设后端返回的内容中包含二维码的URL
            $.cookie('signInToken', qrCodeUrl);
            // 在弹窗中展示二维码
            $('#sign_in_qr').html(response.html)
            requestData();
        },
        error: function() {
            // 请求失败的回调函数
            alert("请求失败，请重试！");
        }
    });
})

$(document).on('click', '#bet_button',function(){
    $.ajax({
        url: "/api/v1/ckbulls/tran_code", // 后端接口的URL
        type: "post", // 请求方法（GET、POST等）
        data: {sign_in_token: $.cookie('signInToken')},
        success: function(response) {
        },
        error: function() {
            // 请求失败的回调函数
            alert("请求失败，请重试！");
        }
    });
})

