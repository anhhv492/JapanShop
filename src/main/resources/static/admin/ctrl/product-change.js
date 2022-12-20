app.controller('product-change',function($rootScope,$scope,$http, $window){
    $scope.listProductChange =[];
    $scope.getOneProduct = {};
    $scope.objectInt = 5;
    $scope.seLected = [];
    const jwtToken = localStorage.getItem("jwtToken");
    const token = {
        headers: {
            Authorization: `Bearer ` + jwtToken
        }
    }
    $scope.logOut = function (){
        $window.location.href = "http://localhost:8080/views/index.html#!/login"
        Swal.fire({
            icon: 'error',
            title: 'Vui lòng đăng nhập lại!!',
            text: 'Tài khoản của bạn không có quyền truy cập!!',
        })
    }

    $scope.checkLogin = function () {
        if (jwtToken == null){
            $scope.logOut();
        }else {
            $http.get("http://localhost:8080/rest/user/getRole",token).then(respon =>{
                if (respon.data.name === "USER"){
                    $scope.logOut();
                }else if (respon.data.name === "ADMIN"){
                    $rootScope.check = null;
                }else {
                    $rootScope.check = "OK";
                }
            })
        }
    }

    $scope.checkLogin();
    $scope.message = function (mes){
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        Toast.fire({
            icon: 'success',
            title: mes,
        })
    }
    $scope.error =  function (err){
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'error',
            title: err,
        })
    }

    $scope.getAllProductChange=function(){
        $http.get('/rest/productchange/getAll').then(resp=>{
            $scope.listProductChange = resp.data;
            console.log('dsadsadsdsadas '+$scope.listProductChange);
        }).catch(error=>{
            console.log(error);
        })
    }
    $scope.imeis = [];
    $scope.getAllProductChangeDetails=function(id){
        $http.get(`/rest/productchange/getPrChangeDetails/${id}`).then(resp=>{
            $scope.getOneProduct = resp.data;
            console.log('dsadsadsdsadas '+resp.data);
            $http.get(`/rest/staff/order/detail/imei2/${ $scope.getOneProduct.orderDetail.idDetail}`).then(res=>{
                $scope.imeis=res.data;
                console.log('dsadsadsdsadas '+ $scope.imeis[0].name);
            }).catch(err=>{
                console.log(err);
            })
        }).catch(error=>{
            console.log(error);
        })

    }

    $scope.getAllProductChange();
    $scope.checkSelected= function (id){
        console.log('sdsadasadsa '+id)
        var check = true;
        for(var i=0;i<$scope.seLected.length;i++){
            if($scope.seLected[i]==id){
                check = false;
                console.log('đã kt id ' + id)
                $scope.seLected.splice(i,1);
            }
        }
        if (check){
            $scope.seLected.push(id);
        }
    }
    $scope.checkSelect=function (id){
        for (var i = 0; i < $scope.seLected.length; i++) {
            if ($scope.seLected[i] == id) {
                console.log('đã kiểm tra id là: '+ id.idChange);
                console.log('đã kiểm tra id là: '+ id.status);
                return true;
            }
        }
    }

    $scope.postRequest = function(){
        if($scope.seLected.length == 0){
            $scope.error("Hãy chọn yêu cầu để xác nhận");
            return null;
        }else{
            $http.post(`/rest/staff/productchange/comfirmRequest`,$scope.seLected).then(response => {
                console.log("ddd " + response.data);
                $scope.message("Đã xác nhận yêu cầu");
                $scope.seLected=[];
                $scope.getAllProductChange();
            }).catch(error => {
                $scope.error('lỗi có bug rồi');
            });
        }

    }

    $scope.putRequest = function(){
        if($scope.seLected.length  == 0){
            $scope.error("Vui lòng chọn yêu cầu hủy");
            return null;
        }
        $http.post(`/rest/staff/productchange/cancelRequest`,$scope.seLected).then(response => {
            console.log("ddd " + response.data);
            $scope.message("Đã hủy yêu cầu");
            $scope.seLected=[];
            $scope.getAllProductChange();
        }).catch(error => {
            $scope.error('lỗi có bug rồi');
        });

    }



});