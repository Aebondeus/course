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
      background: ${({ theme }) => theme.wholeApp};
    }

    .header-logo, .header-logo:hover{
      text-decoration:none;
      color: ${({ theme }) => theme.text};
    }

    .search-tab, .search-tab:focus{
      border: ${({ theme }) => theme.inputBorder};
      background:${({ theme }) => theme.body};
      box-shadow:none;
    }

    .search-tab:focus{
      box-shadow:0 0 3px ${({ theme }) => theme.text};
    }

    .search-tab.form-control{
      color:${({ theme }) => theme.text}
    }

    @media (max-width:576px){
      .search-tab{
        margin-top: 1rem;
      }
    }

    .search-btn, .search-btn:hover, .search-btn:focus {
      text-decoration:none;
      color:${({ theme }) => theme.text};
      box-shadow:none;
    }

    .search-btn:hover{
      font-weight:700;
    }

    #login, #logout{
      color:${({ theme }) => theme.text};
      text-decoration:none;
    }

    #login:hover{
      font-weight:700;
    }
    #login:focus{
      box-shadow:none;
    }

    .modal-content{
      background-color: ${({ theme }) => theme.body}
    }

    #formSignIn, #formPassword, #formEmail, #formNickname {
      border: ${({ theme }) => theme.inputBorder};
      background-color:${({ theme }) => theme.body};
      color:${({ theme }) => theme.text};
    }

    #formSignIn.form-control:focus, #formPassword.form-control:focus,
    #formEmail.form-control:focus, #formNickname.form-control:focus{
      box-shadow:0 0 4px ${({ theme }) => theme.text};
    }

    .close{
      color:${({ theme }) => theme.text};
    }

    .close:hover{
      color:${({ theme }) => theme.closeHover}
    }

    #signin-btn, #register-btn{
      color:${({ theme }) => theme.text}
    }

    #signin-btn.btn-link:hover, #register-btn.btn-link:hover,
    #signin-btn.btn-link:focus, #register-btn.btn-link:focus{
      box-shadow:none;
      text-decoration:none;
      font-weight:700;
    }

    #logo-vk.btn-link{
      color:${({ theme }) => theme.vkBtn};
    }

    #logo-google.btn-link{
      color:${({ theme }) => theme.googleBtn};
    }

    #logo-yandex.btn-link{
      color:${({ theme }) => theme.yandexBtn};
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
      border: 1px solid ${({ theme }) => theme.cardBorder};
    }

    .post-preview{
      border: 1px solid ${({ theme }) => theme.cardBorder};
    }

    .edit-btn, .cancel-btn, .save-btn{
      background:${({ theme }) => theme.wholeApp};
      font-weight:${({ theme }) => theme.inlineBtn};
    }

    .save-btn{
      color:${({ theme }) => theme.saveBtn};
    }

    .cancel-btn{
      color:${({ theme }) => theme.cancelBtn};
    }

    .styles_Editext__input__1534X{
      background:${({ theme }) => theme.wholeApp};
      color:${({ theme }) => theme.text};
    }

    .styles_Editext__input__1534X:focus{
      box-shadow:0 0 3px ${({ theme }) => theme.text};
    }

    .posts-sorter > .card{
      border:1px solid ${({ theme }) => theme.cardBorder};
    }

    .posts-sorter .card-header, .card-footer {
      background-color:${({ theme }) => theme.cardHeaderFooter}
    }

    .post-title.card-header{
      border-bottom:1px solid ${({ theme }) => theme.cardBorder}
    }

    .post-link, .comment-author,
    .post-link:hover, .comment-author:hover{
      color:${({ theme }) => theme.link}
    }
    .userposts-wrapper > .card {
      border: 1px solid ${({ theme }) => theme.cardBorder}
    }

    .btn-link.tag{
      background-color:${({ theme }) => theme.tag};
    }

    .part-card, .comment > .card{
      border:1px solid ${({ theme }) => theme.cardBorder}
    }

    .part-link{
      color: ${({ theme }) => theme.text}
    }

    .part-card:hover{
      background-color:${({ theme }) => theme.partCard};
      transition: all .15s ease-in-out;
    }

    .form-control, .form-control:focus{
      background-color:${({ theme }) => theme.wholeApp};
      color:${({ theme }) => theme.text};
    }

    .form-control:focus{
      box-shadow:0 0 4px ${({ theme }) => theme.text};
      border-color:${({ theme }) => theme.text};
    }

    .send-btn, .send-btn:hover{
      color:${({ theme }) => theme.commentBtn}
    }

    .toast{
      .border: ${({ theme }) => theme.cardBorder}
    }

    .toast-header{
      color:${({ theme }) => theme.toastHeaderText}
    }

    .toast-header, .toast-body{
      background-color:${({ theme }) => theme.toast};
    }

    .mde-header, textarea.mde-text{
      background-color:${({theme}) => theme.mdeHeader}
    }

    .mde-tabs > button, textarea.mde-text,
    .mde-header ul.mde-header-group li.mde-header-item button {
      color:${({theme}) => theme.text}
    }

    .dnd-placeholder{
      background-color:${({theme}) => theme.dropzoneBackground};
      color:${({theme}) => theme.dropzoneText}
    }
    `;
