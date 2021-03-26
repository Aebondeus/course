import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *,
    *::after,
    *::before {
      box-sizing: border-box;
    }

    body{
      background: ${({ theme }) => theme.body};
      color: ${({ theme }) => theme.text};
      min-height:100%;
      margin:0;
      
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  
      transition: all 0.25s linear;
    }

    .whole-app > .container {
      background: ${({theme}) => theme.wholeApp};
    }

    .header-logo, .header-logo:hover{
      text-decoration:none;
      color: ${({theme}) => theme.text};
    }

    .search-tab, .search-tab:focus{
      border: ${({theme}) => theme.inputBorder};
      background:${({theme}) => theme.body};
      box-shadow:none;
    }

    .search-tab:focus{
      box-shadow:0 0 3px ${({theme}) => theme.text};
    }

    .search-tab.form-control{
      color:${({theme}) => theme.text}
    }

    @media (max-width:576px){
      .search-tab{
        margin-top: 1rem;
      }
    }

    .search-btn, .search-btn:hover, .search-btn:focus {
      text-decoration:none;
      color:${({theme}) => theme.text};
      box-shadow:none;
    }

    .search-btn:hover{
      font-weight:700;
    }

    #login{
      color:${({theme}) => theme.text};
      text-decoration:none;
    }

    #login:hover{
      font-weight:700;
    }
    #login:focus{
      box-shadow:none;
    }

    .modal-content{
      background-color: ${({theme}) => theme.body}
    }

    #formSignIn, #formPassword, #formEmail, #formNickname {
      border: ${({theme}) => theme.inputBorder};
      background-color:${({theme}) => theme.body};
      color:${({theme}) => theme.text};
    }

    #formSignIn.form-control:focus, #formPassword.form-control:focus,
    #formEmail.form-control:focus, #formNickname.form-control:focus{
      box-shadow:0 0 4px ${({theme}) => theme.text};
    }

    .close{
      color:${({theme})=> theme.text};
    }

    .close:hover{
      color:${({theme})=> theme.closeHover}
    }

    #signin-btn, #register-btn{
      color:${({theme}) => theme.text}
    }

    #signin-btn.btn-link:hover, #register-btn.btn-link:hover{
      text-decoration:none;
      font-weight:700;
    }

    #logo-vk.btn-link{
      color:${({theme}) => theme.vkBtn};
    }

    #logo-google.btn-link{
      color:${({theme}) => theme.googleBtn};
    }

    #logo-yandex.btn-link{
      color:${({theme}) => theme.yandexBtn};
      font-weight:700;
    }


    #logo-yandex.btn-link:hover{
      text-decoration:none;
    }

    #logo-yandex.btn-link:focus, #logo-google.btn-link:focus, #logo-vk.btn-link:focus{
      box-shadow:none;
    }

    .whole-app .card{
      background-color:none;
      background:inherit;
    }

    .cloud-container{
      border: 1px solid ${({theme}) => theme.postPreview};
    }

    .post-preview{
      border: 1px solid ${({theme}) => theme.postPreview};
    }

    `;
