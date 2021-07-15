/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
       // this.receivedEvent('deviceready');
	// 最優先の言語だけ取得
	var language = (window.navigator.languages && window.navigator.languages[0]) ||
	            window.navigator.language ||
	            window.navigator.userLanguage ||
	            window.navigator.browserLanguage;

	console.log("language:" +language);

    admob.banner.config({
        id: 'ca-app-pub-xxxxxxxx/xxxxxxxx1',
        isTesting: false, //テスト時はtrueにする
        autoShow: true,  
        bannerAtTop: true
    });
          //読み込み
        admob.banner.prepare();
        // 表示
        admob.banner.show();  
        
        setTimeout(function(){
            admob.banner.show();  
        }, 3000);


// this is the complete list of currently supported params you can pass to the plugin (all optional)
var options = {
  message: 'share this', // not supported on some apps (Facebook, Instagram)
  subject: '割勘計算結果', // fi. for email
  chooserTitle: 'アプリを選んでください' // Android only, you can override the default share sheet title
}

var onSuccess = function(result) {
  console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
  console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
}

var onError = function(msg) {
  console.log("Sharing failed with message: " + msg);
}



        var storage  = new StorageControl('local');
        //
		$("#SHAR_BUTTON").hide();
        var TotalPayment=storage.get('TotalPayment'); 
        if(TotalPayment){
            $('#TotalPayment').val(TotalPayment);
        }

        var DutchUnit=storage.get('DutchUnit'); 
        if(DutchUnit){
            $('#DutchUnit').val(DutchUnit);
        }

        var GeneralPeople=storage.get('GeneralPeople'); 
        if(GeneralPeople){
            $('#GeneralPeople').val(GeneralPeople);
        }

        var GroupName1=storage.get('GroupName1'); 
        if(GroupName1){
            $('#GroupName1').val(GroupName1);
        } else{
        GroupName1="グループ１";
        }

        var GroupPeople1=storage.get('GroupPeople1'); 
        if(GroupPeople1){
            $('#GroupPeople1').val(GroupPeople1);
        }

        var DiscountRate1=storage.get('DiscountRate1'); 
        if(DiscountRate1){
            $('#DiscountRate1').val(DiscountRate1);
        }

        var GroupName2=storage.get('GroupName2'); 
        if(GroupName2){
            $('#GroupName2').val(GroupName2);
        } else{
        GroupName2="グループ２";
        }

        var GroupPeople2=storage.get('GroupPeople2'); 
        if(GroupPeople2){
            $('#GroupPeople2').val(GroupPeople2);
        }

        var DiscountRate2=storage.get('DiscountRate2'); 
        if(DiscountRate2){
            $('#DiscountRate2').val(DiscountRate2);
        }


        $('#TotalPayment').change(function() {

        storage.save('TotalPayment', $('#TotalPayment').val()); 
        });

        $('#DutchUnit').change(function() {

        storage.save('DutchUnit', $('#DutchUnit').val()); 
        });

        $('#GeneralPeople').change(function() {
            storage.save('GeneralPeople', $('#GeneralPeople').val()); 
        });

        $('#GroupName1').change(function() {
        console.log($('#GroupName1').val());
        GroupName1=$('#GroupName1').val();
        storage.save('GroupName1', $('#GroupName1').val()); 
        });

        $('#GroupPeople1').change(function() {

        storage.save('GroupPeople1', $('#GroupPeople1').val()); 
        });

        $('#DiscountRate1').change(function() {

        storage.save('DiscountRate1', $('#DiscountRate1').val()); 
        });

        $('#GroupName2').change(function() {
        console.log($('#GroupName2').val());
        GroupName2=$('#GroupName2').val();
        storage.save('GroupName2', $('#GroupName2').val()); 
        });

        $('#GroupPeople2').change(function() {

        storage.save('GroupPeople2', $('#GroupPeople2').val()); 
        });

        $('#DiscountRate2').change(function() {

        storage.save('DiscountRate2', $('#DiscountRate2').val()); 
        });

        $('#SHAR_BUTTON').click(function() {
		window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
	     });

        //割勘計算
        $('#CalculationExecution').click(function() {
        var totalInvoice=parseInt($("#TotalPayment").val()); //支払額
        var dutchUnit=parseInt($("#DutchUnit").val()); //支払単位

        var generalPeople=parseInt($("#GeneralPeople").val()); //一般人数
        var groupPeople1=parseInt($("#GroupPeople1").val()); //グループ１数
        var groupPeople2=$("#GroupPeople2").val(); //グループ１数

        var discountRate1=parseFloat($("#DiscountRate1").val()); //割引率
        var discountRate2=parseFloat($("#DiscountRate2").val()); //割引率
        console.log("人数");
        console.log(generalPeople);
        console.log(groupPeople1);
        console.log(groupPeople2);

        //単純平均

        var avg= totalInvoice/(generalPeople+groupPeople1+groupPeople2);
        console.log("単純平均");

        console.log(avg);

        console.log("割引率");
        console.log(discountRate1);
        console.log(discountRate2);

        var generalPayment = parseInt(avg/dutchUnit)*dutchUnit; // 単位切り捨て

        var groupPayment1 = parseInt((avg *discountRate1)/dutchUnit )*dutchUnit; // 単位切り捨て
        var groupPayment2 = parseInt((avg *discountRate2)/dutchUnit )*dutchUnit; // 単位切り捨て
        console.log("単純平均");
        console.log(generalPayment);
        console.log(groupPayment1);
        console.log(groupPayment2);
        var totalPayment=0;

        while (totalPayment<totalInvoice) {
         generalPayment += dutchUnit;
         if(discountRate1>0){
         groupPayment1 =parseInt((generalPayment*discountRate1)/dutchUnit)*dutchUnit ;
         }
         if(discountRate2>0){
         groupPayment2 =parseInt((generalPayment*discountRate2)/dutchUnit)*dutchUnit ;
         }
         totalPayment=generalPayment*generalPeople+groupPeople1*groupPayment1+groupPeople2*groupPayment2;
        console.log(totalPayment);
        }
        console.log("--調整--");
        console.log(generalPayment);
        console.log(groupPayment1);
        console.log(groupPayment2);
        console.log(totalPayment);

        var text = $("#CalculationResult");
        var memo = '<div style="font-size:120%" >';
        var message = '====== 割勘計算===== \n\n';

         memo += "<p>支払額:"+totalInvoice+ "円<p>";
         message += "支払額: "+totalInvoice+ "円\n";
         memo += "<p>一般:("+ generalPeople  +"人)&ensp;"+generalPayment+ "円<p>";
         message += "一般:("+ generalPeople  +"人) "+generalPayment+ "円\n";

        if(groupPeople1>0){
            memo += "<p>"+GroupName1+":(" + groupPeople1 +"人)&ensp;" +groupPayment1+ "円<p>";
            message += GroupName1+":(" + groupPeople1 +"人) " +groupPayment1+ "円\n";
        }
        if(groupPeople2>0){
            memo += "<p>"+GroupName2+":(" + groupPeople2 +"人)&ensp;"  +groupPayment2+ "円<p>";
            message += GroupName2+":(" + groupPeople2 +"人)"  +groupPayment2+ "円 \n";

        }
        memo += "<p>集金:"+totalPayment+ "円<p>";
        message += "集金:"+totalPayment+ "円 \n";

        memo += "<p>調整(お釣り):"+ ( totalPayment-totalInvoice) + "円<p>";
        message += "調整(お釣り):"+ ( totalPayment-totalInvoice) + "円\n";

        memo += "</div>";

        text.html( memo );
        options.message=message;
//
		$("#SHAR_BUTTON").show();



        });




    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();




/*

総支払額
TotalPayment


MoneyReceived = GeneralPeople* GeneralMoney + GrouplPeople1 *GrouplMoney1 ++ GrouplPeople2 *GrouplMoney2

GrouplMoney1 = DiscountRate1*GeneralMoney
 
GrouplMoney1 = DiscountRate2*GeneralMoney



MoneyReceived = GeneralPeople* GeneralMoney + GrouplPeople1 *DiscountRate1*GeneralMoney + GrouplPeople2 *DiscountRate2*GeneralMoney

MoneyReceived = GeneralMoney(GeneralPeople + GrouplPeople1 *DiscountRate1 + GrouplPeople2 *DiscountRate2)
(MoneyReceived /GrouplPeople1 /DiscountRate1) - (GeneralPeople + GrouplPeople1 *DiscountRate1)/DiscountRate2 = GrouplPeople2 


割勘単位
DutchUnit">


一般人数
GeneralPeople

支払い
GeneralMoney
--
グループ1
GroupName1

グループ1人数
GrouplPeople1

GrouplMoney1

割引率き
DiscountRate1
--

グループ2
GroupName1

グループ2人数
GrouplPeople1

割引率き
DiscountRate1

CalculationExecution

CalculationResult


*/