import {
  loginWithGithub,
  loginWithGoogle,
} from "../db/users/loginWithProvider";

export default () => {
  return (
    <div class="container-sign-with">
      <div class="title">
        <div> </div>
        <p>Or sign up with</p>
        <div> </div>
      </div>
      <div class="list-social">
        <button class="sign-with" onclick={loginWithGithub}>
          Github
        </button>
        <button class="sign-with" onclick={loginWithGoogle}>
          Google
        </button>
      </div>
      <svg height="10" width="100%">
        <line
          x1="0"
          y1="0"
          x2="100%"
          y2="0"
          style="stroke:rgb(160,160,160);stroke-width:2"
        />
      </svg>
    </div>
  );
};
