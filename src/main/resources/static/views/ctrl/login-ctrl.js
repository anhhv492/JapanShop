app.controller('login-ctrl',function($rootScope,$scope,$http,$window){
    $scope.form = {};
    $scope.jwt ;
    const pathAPI = "http://localhost:8080/api/auth/login";

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

    localStorage.removeItem('jwtToken');
    $scope.onLogin = function () {
        $http.post(pathAPI, $scope.form).then(respon =>{
            $scope.message('Đăng nhập thành công');
            localStorage.setItem('jwtToken', respon.data.token);
            $scope.jwt = localStorage.getItem('jwtToken')
            $window.location.href = '#!home/index';
        }).catch(error => {
            $scope.error('Đăng nhập thất bại');
        })
    }

    $scope.logOut= function () {
        localStorage.removeItem('jwtToken');
    }
})