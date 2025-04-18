// src/components/Footer.tsx
import { Link } from "react-router-dom";
import { 
  FacebookIcon, 
  TwitterIcon, 
  XIcon,
  InstagramIcon, 
  YoutubeIcon,
  TMDBLogo, 
  GlobeIcon,
  AppStoreIcon,
  PlayStoreIcon
} from "./Icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Navigation Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/movies" className="hover:text-white transition-colors">Movies</Link>
              </li>
              <li>
                <Link to="/tv-shows" className="hover:text-white transition-colors">TV Shows</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/movies/popular" className="hover:text-white transition-colors">Popular</Link>
              </li>
              <li>
                <Link to="/movies/top-rated" className="hover:text-white transition-colors">Top Rated</Link>
              </li>
              <li>
                <Link to="/movies/upcoming" className="hover:text-white transition-colors">Upcoming</Link>
              </li>
              <li>
                <Link to="/tv-shows/airing-today" className="hover:text-white transition-colors">Airing Today</Link>
              </li>
              <li>
                <Link to="/tv-shows/on-the-air" className="hover:text-white transition-colors">On TV</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
              </li>
              <li>
                <Link to="/dmca" className="hover:text-white transition-colors">DMCA</Link>
              </li>
            </ul>
          </div>

          {/* Social & Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <FacebookIcon className="w-6 h-6" />
              </a>
              <a href="https://twitter.com/victorcamacar19" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <XIcon className="w-6 h-6" />
              </a>
              <a href="https://instagram.com/victorcamacaro1999" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <InstagramIcon className="w-6 h-6" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <YoutubeIcon className="w-6 h-6" />
              </a>
            </div>

            <div className="mb-4">
              <h4 className="text-white font-semibold mb-2">Powered by</h4>
              <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
                <TMDBLogo className="h-8" />
              </a>
            </div>

            <div className="mt-6">
              <p className="text-gray-400 mb-3">Get our mobile app</p>
                        <div class="flex items-start justify-start gap-4"><a class="w-[135px] h-[40px] relative rounded" target="_blank" href="https://apps.apple.com/us/app/cines-unidos/id6450429661"><svg viewBox="0 0 135 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M81.5257 19.2009V21.4919H80.0896V22.9943H81.5257V28.0993C81.5257 29.8425 82.3143 30.5397 84.2981 30.5397C84.6468 30.5397 84.9788 30.4982 85.2693 30.4484V28.9626C85.0203 28.9875 84.8626 29.0041 84.5887 29.0041C83.7005 29.0041 83.3104 28.589 83.3104 27.6428V22.9943H85.2693V21.4919H83.3104V19.2009H81.5257Z" fill="white"></path><path d="M90.3232 30.6642C92.9628 30.6642 94.5815 28.8962 94.5815 25.966C94.5815 23.0524 92.9545 21.2761 90.3232 21.2761C87.6835 21.2761 86.0566 23.0524 86.0566 25.966C86.0566 28.8962 87.6752 30.6642 90.3232 30.6642ZM90.3232 29.0788C88.7709 29.0788 87.8994 27.9416 87.8994 25.966C87.8994 24.007 88.7709 22.8615 90.3232 22.8615C91.8671 22.8615 92.747 24.007 92.747 25.966C92.747 27.9333 91.8671 29.0788 90.3232 29.0788Z" fill="white"></path><path d="M95.9664 30.4899H97.7511V25.1525C97.7511 23.8825 98.7056 23.0275 100.059 23.0275C100.374 23.0275 100.905 23.0856 101.055 23.1354V21.3757C100.864 21.3259 100.524 21.301 100.258 21.301C99.0792 21.301 98.0748 21.9484 97.8175 22.8366H97.6846V21.4504H95.9664V30.4899Z" fill="white"></path><path d="M105.486 22.7951C106.806 22.7951 107.669 23.7165 107.711 25.1359H103.145C103.245 23.7248 104.166 22.7951 105.486 22.7951ZM107.702 28.0495C107.37 28.7551 106.632 29.1452 105.552 29.1452C104.125 29.1452 103.203 28.1408 103.145 26.5554V26.4557H109.529V25.8332C109.529 22.9943 108.009 21.2761 105.494 21.2761C102.946 21.2761 101.327 23.1105 101.327 25.9992C101.327 28.8879 102.913 30.6642 105.503 30.6642C107.57 30.6642 109.014 29.6681 109.421 28.0495H107.702Z" fill="white"></path><path d="M69.8221 27.1518C69.9598 29.3715 71.8095 30.791 74.5626 30.791C77.505 30.791 79.3462 29.3026 79.3462 26.9281C79.3462 25.0611 78.2966 24.0287 75.7499 23.435L74.382 23.0995C72.7645 22.7209 72.1106 22.2133 72.1106 21.3272C72.1106 20.2087 73.1259 19.4774 74.6487 19.4774C76.0941 19.4774 77.0921 20.1915 77.2727 21.3358H79.1483C79.0365 19.2451 77.1953 17.7739 74.6745 17.7739C71.9644 17.7739 70.1576 19.2451 70.1576 21.4562C70.1576 23.2802 71.1815 24.3642 73.427 24.889L75.0272 25.2762C76.6705 25.6634 77.3932 26.2312 77.3932 27.1776C77.3932 28.2788 76.2575 29.0789 74.7089 29.0789C73.0484 29.0789 71.8955 28.3304 71.7321 27.1518H69.8221Z" fill="white"></path><path d="M51.3348 21.301C50.1063 21.301 49.0437 21.9152 48.4959 22.9445H48.3631V21.4504H46.6448V33.4948H48.4295V29.1203H48.5706C49.0437 30.0749 50.0647 30.6393 51.3514 30.6393C53.6341 30.6393 55.0867 28.8381 55.0867 25.966C55.0867 23.0939 53.6341 21.301 51.3348 21.301ZM50.8284 29.0373C49.3343 29.0373 48.3963 27.8586 48.3963 25.9743C48.3963 24.0817 49.3343 22.903 50.8367 22.903C52.3475 22.903 53.2522 24.0568 53.2522 25.966C53.2522 27.8835 52.3475 29.0373 50.8284 29.0373Z" fill="white"></path><path d="M61.3316 21.301C60.103 21.301 59.0405 21.9152 58.4927 22.9445H58.3599V21.4504H56.6416V33.4948H58.4263V29.1203H58.5674C59.0405 30.0749 60.0615 30.6393 61.3482 30.6393C63.6309 30.6393 65.0835 28.8381 65.0835 25.966C65.0835 23.0939 63.6309 21.301 61.3316 21.301ZM60.8252 29.0373C59.3311 29.0373 58.3931 27.8586 58.3931 25.9743C58.3931 24.0817 59.3311 22.903 60.8335 22.903C62.3443 22.903 63.249 24.0568 63.249 25.966C63.249 27.8835 62.3443 29.0373 60.8252 29.0373Z" fill="white"></path><path d="M43.4428 30.4899H45.4905L41.008 18.075H38.9346L34.4521 30.4899H36.431L37.5752 27.1948H42.3072L43.4428 30.4899ZM39.8724 20.3292H40.0186L41.8168 25.5773H38.0656L39.8724 20.3292Z" fill="white"></path><path d="M35.6514 8.71069V14.6997H37.8137C39.5984 14.6997 40.6318 13.5999 40.6318 11.6865C40.6318 9.80225 39.5901 8.71069 37.8137 8.71069H35.6514ZM36.5811 9.55737H37.71C38.9509 9.55737 39.6855 10.3459 39.6855 11.699C39.6855 13.0728 38.9634 13.853 37.71 13.853H36.5811V9.55737Z" fill="white"></path><path d="M43.7969 14.7869C45.1167 14.7869 45.9261 13.9028 45.9261 12.4377C45.9261 10.981 45.1126 10.0928 43.7969 10.0928C42.4771 10.0928 41.6636 10.981 41.6636 12.4377C41.6636 13.9028 42.4729 14.7869 43.7969 14.7869ZM43.7969 13.9941C43.0208 13.9941 42.585 13.4255 42.585 12.4377C42.585 11.4583 43.0208 10.8855 43.7969 10.8855C44.5689 10.8855 45.0088 11.4583 45.0088 12.4377C45.0088 13.4214 44.5689 13.9941 43.7969 13.9941Z" fill="white"></path><path d="M52.8182 10.1799H51.9259L51.1207 13.6289H51.0501L50.1205 10.1799H49.2655L48.3358 13.6289H48.2694L47.4601 10.1799H46.5553L47.8004 14.6997H48.7176L49.6473 11.3711H49.7179L50.6517 14.6997H51.5772L52.8182 10.1799Z" fill="white"></path><path d="M53.8458 14.6997H54.7382V12.0559C54.7382 11.3503 55.1574 10.9104 55.8173 10.9104C56.4772 10.9104 56.7926 11.2715 56.7926 11.9978V14.6997H57.685V11.7737C57.685 10.6987 57.1288 10.0928 56.1203 10.0928C55.4396 10.0928 54.9914 10.3958 54.7714 10.8979H54.705V10.1799H53.8458V14.6997Z" fill="white"></path><path d="M59.0903 14.6997H59.9826V8.41602H59.0903V14.6997Z" fill="white"></path><path d="M63.3386 14.7869C64.6584 14.7869 65.4678 13.9028 65.4678 12.4377C65.4678 10.981 64.6543 10.0928 63.3386 10.0928C62.0188 10.0928 61.2053 10.981 61.2053 12.4377C61.2053 13.9028 62.0146 14.7869 63.3386 14.7869ZM63.3386 13.9941C62.5625 13.9941 62.1267 13.4255 62.1267 12.4377C62.1267 11.4583 62.5625 10.8855 63.3386 10.8855C64.1106 10.8855 64.5505 11.4583 64.5505 12.4377C64.5505 13.4214 64.1106 13.9941 63.3386 13.9941Z" fill="white"></path><path d="M68.1265 14.0232C67.6409 14.0232 67.2881 13.7866 67.2881 13.3799C67.2881 12.9814 67.5704 12.7698 68.1929 12.7283L69.2969 12.6577V13.0354C69.2969 13.5957 68.7989 14.0232 68.1265 14.0232ZM67.8982 14.7744C68.4917 14.7744 68.9856 14.5171 69.2554 14.0647H69.326V14.6997H70.1851V11.6118C70.1851 10.6572 69.5459 10.0928 68.4129 10.0928C67.3877 10.0928 66.6573 10.5908 66.566 11.3669H67.4292C67.5289 11.0474 67.8733 10.8647 68.3714 10.8647C68.9815 10.8647 69.2969 11.1345 69.2969 11.6118V12.002L68.0726 12.0725C66.9976 12.1389 66.3916 12.6079 66.3916 13.4214C66.3916 14.2473 67.0267 14.7744 67.8982 14.7744Z" fill="white"></path><path d="M73.2132 14.7744C73.8358 14.7744 74.3629 14.4797 74.6327 13.9858H74.7032V14.6997H75.5582V8.41602H74.6659V10.8979H74.5995C74.3546 10.3999 73.8316 10.1052 73.2132 10.1052C72.0719 10.1052 71.3373 11.01 71.3373 12.4377C71.3373 13.8696 72.0636 14.7744 73.2132 14.7744ZM73.4664 10.9062C74.2135 10.9062 74.6825 11.4998 74.6825 12.4419C74.6825 13.3882 74.2176 13.9734 73.4664 13.9734C72.711 13.9734 72.2586 13.3965 72.2586 12.4377C72.2586 11.4873 72.7152 10.9062 73.4664 10.9062Z" fill="white"></path><path d="M81.3447 14.7869C82.6645 14.7869 83.4738 13.9028 83.4738 12.4377C83.4738 10.981 82.6604 10.0928 81.3447 10.0928C80.0249 10.0928 79.2114 10.981 79.2114 12.4377C79.2114 13.9028 80.0207 14.7869 81.3447 14.7869ZM81.3447 13.9941C80.5686 13.9941 80.1328 13.4255 80.1328 12.4377C80.1328 11.4583 80.5686 10.8855 81.3447 10.8855C82.1166 10.8855 82.5566 11.4583 82.5566 12.4377C82.5566 13.4214 82.1166 13.9941 81.3447 13.9941Z" fill="white"></path><path d="M84.655 14.6997H85.5474V12.0559C85.5474 11.3503 85.9666 10.9104 86.6265 10.9104C87.2864 10.9104 87.6018 11.2715 87.6018 11.9978V14.6997H88.4941V11.7737C88.4941 10.6987 87.938 10.0928 86.9294 10.0928C86.2488 10.0928 85.8005 10.3958 85.5806 10.8979H85.5142V10.1799H84.655V14.6997Z" fill="white"></path><path d="M92.6039 9.05518V10.2007H91.8858V10.9519H92.6039V13.5044C92.6039 14.376 92.9981 14.7246 93.9901 14.7246C94.1644 14.7246 94.3304 14.7039 94.4757 14.679V13.936C94.3512 13.9485 94.2723 13.9568 94.1353 13.9568C93.6913 13.9568 93.4962 13.7493 93.4962 13.2761V10.9519H94.4757V10.2007H93.4962V9.05518H92.6039Z" fill="white"></path><path d="M95.6735 14.6997H96.5658V12.0601C96.5658 11.3752 96.9726 10.9146 97.703 10.9146C98.3339 10.9146 98.6701 11.2798 98.6701 12.002V14.6997H99.5624V11.782C99.5624 10.707 98.9689 10.0969 98.006 10.0969C97.3253 10.0969 96.848 10.3999 96.6281 10.9062H96.5575V8.41602H95.6735V14.6997Z" fill="white"></path><path d="M102.781 10.8523C103.441 10.8523 103.873 11.313 103.894 12.0227H101.611C101.661 11.3171 102.122 10.8523 102.781 10.8523ZM103.89 13.4795C103.724 13.8323 103.354 14.0273 102.815 14.0273C102.101 14.0273 101.64 13.5251 101.611 12.7324V12.6826H104.803V12.3713C104.803 10.9519 104.043 10.0928 102.786 10.0928C101.511 10.0928 100.702 11.01 100.702 12.4543C100.702 13.8987 101.495 14.7869 102.79 14.7869C103.823 14.7869 104.545 14.2888 104.749 13.4795H103.89Z" fill="white"></path><path d="M24.769 20.3011C24.7907 18.6201 25.6934 17.0295 27.1256 16.149C26.2221 14.8587 24.7088 14.0406 23.1344 13.9913C21.4552 13.8151 19.8272 14.9962 18.9715 14.9962C18.0992 14.9962 16.7817 14.0088 15.363 14.038C13.5137 14.0978 11.7898 15.1491 10.8901 16.7659C8.95607 20.1143 10.3987 25.0354 12.2513 27.742C13.1782 29.0673 14.2615 30.5478 15.6789 30.4953C17.066 30.4377 17.584 29.6108 19.2583 29.6108C20.9171 29.6108 21.4031 30.4953 22.8493 30.4619C24.3377 30.4377 25.2754 29.1306 26.1698 27.7927C26.8358 26.8484 27.3483 25.8047 27.6882 24.7002C25.9391 23.9604 24.771 22.2002 24.769 20.3011Z" fill="white"></path><path d="M22.0373 12.2113C22.8489 11.2371 23.2487 9.98494 23.1518 8.7207C21.912 8.85092 20.7668 9.44348 19.9443 10.3803C19.14 11.2956 18.7214 12.5258 18.8006 13.7417C20.0408 13.7545 21.2601 13.178 22.0373 12.2113Z" fill="white"></path><rect x="0.5" y="0.5" width="134" height="39" rx="6.5" stroke="white"></rect></svg></a><a class="w-[135px] h-[40px] relative rounded" target="_blank" href="https://play.google.com/store/apps/details?id=com.avilatek.cinesunidos"><svg viewBox="0 0 135 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M68.136 21.7509C65.784 21.7509 63.867 23.5399 63.867 26.0039C63.867 28.4529 65.784 30.2569 68.136 30.2569C70.489 30.2569 72.406 28.4529 72.406 26.0039C72.405 23.5399 70.488 21.7509 68.136 21.7509ZM68.136 28.5829C66.847 28.5829 65.736 27.5199 65.736 26.0049C65.736 24.4739 66.848 23.4269 68.136 23.4269C69.425 23.4269 70.536 24.4739 70.536 26.0049C70.536 27.5189 69.425 28.5829 68.136 28.5829ZM58.822 21.7509C56.47 21.7509 54.553 23.5399 54.553 26.0039C54.553 28.4529 56.47 30.2569 58.822 30.2569C61.175 30.2569 63.092 28.4529 63.092 26.0039C63.092 23.5399 61.175 21.7509 58.822 21.7509ZM58.822 28.5829C57.533 28.5829 56.422 27.5199 56.422 26.0049C56.422 24.4739 57.534 23.4269 58.822 23.4269C60.111 23.4269 61.222 24.4739 61.222 26.0049C61.223 27.5189 60.111 28.5829 58.822 28.5829ZM47.744 23.0569V24.8609H52.062C51.933 25.8759 51.595 26.6169 51.079 27.1319C50.451 27.7599 49.468 28.4529 47.744 28.4529C45.086 28.4529 43.008 26.3099 43.008 23.6519C43.008 20.9939 45.086 18.8509 47.744 18.8509C49.178 18.8509 50.225 19.4149 50.998 20.1399L52.271 18.8669C51.191 17.8359 49.758 17.0469 47.744 17.0469C44.103 17.0469 41.042 20.0109 41.042 23.6519C41.042 27.2929 44.103 30.2569 47.744 30.2569C49.709 30.2569 51.192 29.6119 52.351 28.4039C53.543 27.2119 53.914 25.5359 53.914 24.1829C53.914 23.7649 53.882 23.3779 53.817 23.0559H47.744V23.0569ZM93.052 24.4579C92.698 23.5079 91.618 21.7509 89.411 21.7509C87.22 21.7509 85.399 23.4749 85.399 26.0039C85.399 28.3879 87.204 30.2569 89.62 30.2569C91.569 30.2569 92.697 29.0649 93.165 28.3719L91.715 27.4049C91.232 28.1139 90.571 28.5809 89.62 28.5809C88.67 28.5809 87.993 28.1459 87.558 27.2919L93.245 24.9399L93.052 24.4579ZM87.252 25.8759C87.204 24.2319 88.525 23.3949 89.476 23.3949C90.217 23.3949 90.845 23.7659 91.055 24.2969L87.252 25.8759ZM82.629 29.9999H84.497V17.4989H82.629V29.9999ZM79.567 22.7019H79.503C79.084 22.2019 78.278 21.7509 77.264 21.7509C75.137 21.7509 73.188 23.6199 73.188 26.0209C73.188 28.4049 75.137 30.2579 77.264 30.2579C78.279 30.2579 79.084 29.8069 79.503 29.2919H79.567V29.9039C79.567 31.5309 78.697 32.4009 77.296 32.4009C76.152 32.4009 75.443 31.5799 75.153 30.8869L73.526 31.5639C73.993 32.6909 75.233 34.0769 77.296 34.0769C79.487 34.0769 81.34 32.7879 81.34 29.6459V22.0099H79.568V22.7019H79.567ZM77.425 28.5829C76.136 28.5829 75.057 27.5029 75.057 26.0209C75.057 24.5219 76.136 23.4269 77.425 23.4269C78.697 23.4269 79.696 24.5219 79.696 26.0209C79.696 27.5029 78.697 28.5829 77.425 28.5829ZM101.806 17.4989H97.335V29.9999H99.2V25.2639H101.805C103.873 25.2639 105.907 23.7669 105.907 21.3819C105.907 18.9969 103.874 17.4989 101.806 17.4989ZM101.854 23.5239H99.2V19.2389H101.854C103.249 19.2389 104.041 20.3939 104.041 21.3819C104.041 22.3499 103.249 23.5239 101.854 23.5239ZM113.386 21.7289C112.035 21.7289 110.636 22.3239 110.057 23.6429L111.713 24.3339C112.067 23.6429 112.727 23.4169 113.418 23.4169C114.383 23.4169 115.364 23.9959 115.38 25.0249V25.1539C115.042 24.9609 114.318 24.6719 113.434 24.6719C111.649 24.6719 109.831 25.6529 109.831 27.4859C109.831 29.1589 111.295 30.2359 112.935 30.2359C114.189 30.2359 114.881 29.6729 115.315 29.0129H115.379V29.9779H117.181V25.1849C117.182 22.9669 115.524 21.7289 113.386 21.7289ZM113.16 28.5799C112.55 28.5799 111.697 28.2739 111.697 27.5179C111.697 26.5529 112.759 26.1829 113.676 26.1829C114.495 26.1829 114.882 26.3599 115.38 26.6009C115.235 27.7599 114.238 28.5799 113.16 28.5799ZM123.743 22.0019L121.604 27.4219H121.54L119.32 22.0019H117.31L120.639 29.5769L118.741 33.7909H120.687L125.818 22.0019H123.743ZM106.937 29.9999H108.802V17.4989H106.937V29.9999Z" fill="white"></path><path d="M47.418 10.2432C47.418 11.0812 47.1701 11.7482 46.673 12.2462C46.109 12.8382 45.3731 13.1342 44.4691 13.1342C43.6031 13.1342 42.8661 12.8342 42.2611 12.2342C41.6551 11.6332 41.3521 10.8892 41.3521 10.0012C41.3521 9.11219 41.6551 8.36819 42.2611 7.76819C42.8661 7.16719 43.6031 6.86719 44.4691 6.86719C44.8991 6.86719 45.3101 6.95119 45.7001 7.11819C46.0911 7.28619 46.404 7.50919 46.6381 7.78819L46.111 8.31619C45.714 7.84119 45.167 7.60419 44.468 7.60419C43.836 7.60419 43.29 7.82619 42.829 8.27019C42.368 8.71419 42.1381 9.29119 42.1381 10.0002C42.1381 10.7092 42.368 11.2862 42.829 11.7302C43.29 12.1742 43.836 12.3962 44.468 12.3962C45.138 12.3962 45.6971 12.1732 46.1441 11.7262C46.4341 11.4352 46.602 11.0302 46.647 10.5112H44.468V9.79019H47.375C47.405 9.94719 47.418 10.0982 47.418 10.2432Z" fill="white"></path><path d="M52.0281 7.73724H49.2961V9.63924H51.7601V10.3602H49.2961V12.2622H52.0281V13.0002H48.5251V7.00024H52.0281V7.73724Z" fill="white"></path><path d="M55.279 13.0002H54.508V7.73724H52.832V7.00024H56.955V7.73724H55.279V13.0002Z" fill="white"></path><path d="M59.938 13.0002V7.00024H60.709V13.0002H59.938Z" fill="white"></path><path d="M64.1281 13.0002H63.3572V7.73724H61.6812V7.00024H65.8042V7.73724H64.1281V13.0002Z" fill="white"></path><path d="M73.6089 12.2252C73.0189 12.8312 72.2859 13.1342 71.4089 13.1342C70.5319 13.1342 69.7989 12.8312 69.2099 12.2252C68.6199 11.6192 68.3259 10.8772 68.3259 10.0002C68.3259 9.12323 68.6199 8.38123 69.2099 7.77523C69.7989 7.16923 70.5319 6.86523 71.4089 6.86523C72.2809 6.86523 73.0129 7.17023 73.6049 7.77923C74.1969 8.38823 74.4929 9.12823 74.4929 10.0002C74.4929 10.8772 74.1979 11.6192 73.6089 12.2252ZM69.7789 11.7222C70.2229 12.1722 70.7659 12.3962 71.4089 12.3962C72.0519 12.3962 72.5959 12.1712 73.0389 11.7222C73.4829 11.2722 73.7059 10.6982 73.7059 10.0002C73.7059 9.30223 73.4829 8.72823 73.0389 8.27823C72.5959 7.82823 72.0519 7.60423 71.4089 7.60423C70.7659 7.60423 70.2229 7.82923 69.7789 8.27823C69.3359 8.72823 69.1129 9.30223 69.1129 10.0002C69.1129 10.6982 69.3359 11.2722 69.7789 11.7222Z" fill="white"></path><path d="M75.5749 13.0002V7.00024H76.513L79.429 11.6672H79.4619L79.429 10.5112V7.00024H80.1999V13.0002H79.3949L76.344 8.10625H76.3109L76.344 9.26224V13.0002H75.5749Z" fill="white"></path><path d="M47.418 10.2432C47.418 11.0812 47.1701 11.7482 46.673 12.2462C46.109 12.8382 45.3731 13.1342 44.4691 13.1342C43.6031 13.1342 42.8661 12.8342 42.2611 12.2342C41.6551 11.6332 41.3521 10.8892 41.3521 10.0012C41.3521 9.11219 41.6551 8.36819 42.2611 7.76819C42.8661 7.16719 43.6031 6.86719 44.4691 6.86719C44.8991 6.86719 45.3101 6.95119 45.7001 7.11819C46.0911 7.28619 46.404 7.50919 46.6381 7.78819L46.111 8.31619C45.714 7.84119 45.167 7.60419 44.468 7.60419C43.836 7.60419 43.29 7.82619 42.829 8.27019C42.368 8.71419 42.1381 9.29119 42.1381 10.0002C42.1381 10.7092 42.368 11.2862 42.829 11.7302C43.29 12.1742 43.836 12.3962 44.468 12.3962C45.138 12.3962 45.6971 12.1732 46.1441 11.7262C46.4341 11.4352 46.602 11.0302 46.647 10.5112H44.468V9.79019H47.375C47.405 9.94719 47.418 10.0982 47.418 10.2432Z" stroke="white" stroke-width="0.2" stroke-miterlimit="10"></path><path d="M52.0281 7.73724H49.2961V9.63924H51.7601V10.3602H49.2961V12.2622H52.0281V13.0002H48.5251V7.00024H52.0281V7.73724Z" stroke="white" stroke-width="0.2" stroke-miterlimit="10"></path><path d="M55.279 13.0002H54.508V7.73724H52.832V7.00024H56.955V7.73724H55.279V13.0002Z" stroke="white" stroke-width="0.2" stroke-miterlimit="10"></path><path d="M59.938 13.0002V7.00024H60.709V13.0002H59.938Z" stroke="white" stroke-width="0.2" stroke-miterlimit="10"></path><path d="M64.1281 13.0002H63.3572V7.73724H61.6812V7.00024H65.8042V7.73724H64.1281V13.0002Z" stroke="white" stroke-width="0.2" stroke-miterlimit="10"></path><path d="M73.6089 12.2252C73.0189 12.8312 72.2859 13.1342 71.4089 13.1342C70.5319 13.1342 69.7989 12.8312 69.2099 12.2252C68.6199 11.6192 68.3259 10.8772 68.3259 10.0002C68.3259 9.12323 68.6199 8.38123 69.2099 7.77523C69.7989 7.16923 70.5319 6.86523 71.4089 6.86523C72.2809 6.86523 73.0129 7.17023 73.6049 7.77923C74.1969 8.38823 74.4929 9.12823 74.4929 10.0002C74.4929 10.8772 74.1979 11.6192 73.6089 12.2252ZM69.7789 11.7222C70.2229 12.1722 70.7659 12.3962 71.4089 12.3962C72.0519 12.3962 72.5959 12.1712 73.0389 11.7222C73.4829 11.2722 73.7059 10.6982 73.7059 10.0002C73.7059 9.30223 73.4829 8.72823 73.0389 8.27823C72.5959 7.82823 72.0519 7.60423 71.4089 7.60423C70.7659 7.60423 70.2229 7.82923 69.7789 8.27823C69.3359 8.72823 69.1129 9.30223 69.1129 10.0002C69.1129 10.6982 69.3359 11.2722 69.7789 11.7222Z" stroke="white" stroke-width="0.2" stroke-miterlimit="10"></path><path d="M75.5749 13.0002V7.00024H76.513L79.429 11.6672H79.4619L79.429 10.5112V7.00024H80.1999V13.0002H79.3949L76.344 8.10625H76.3109L76.344 9.26224V13.0002H75.5749Z" stroke="white" stroke-width="0.2" stroke-miterlimit="10"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M10.1565 7.96666C10.0384 8.23416 9.97314 8.56193 9.97314 8.94318V31.0592C9.97314 31.4413 10.0385 31.7691 10.1567 32.0365L22.1907 20.0008L10.1565 7.96666ZM10.8517 32.7557C11.2978 32.9465 11.8797 32.886 12.5141 32.5262L26.6712 24.4814L22.8978 20.7079L10.8517 32.7557ZM27.5737 23.9696L32.0151 21.4462C33.4121 20.6512 33.4121 19.3522 32.0151 18.5582L27.5717 16.0333L23.6048 20.0008L27.5737 23.9696ZM26.6699 15.5209L12.5141 7.47719C11.8796 7.11661 11.2977 7.05645 10.8516 7.24759L22.8977 19.2937L26.6699 15.5209Z" fill="white"></path><rect x="0.5" y="0.5" width="134" height="39" rx="4.5" stroke="white"></rect></svg></a></div> 

            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              &copy; {currentYear} MovieDB. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              This product uses the TMDB API but is not endorsed or certified by TMDB.
            </p>
          </div>
          <div className="text-sm flex items-center">
            <span className="text-gray-500">Developed by</span>
            <a 
              href="https://victorcamacaro.pages.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center ml-1 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <GlobeIcon className="w-4 h-4 mr-1" />
              Victor Camacaro
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}