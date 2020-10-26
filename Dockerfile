FROM node:14 as webbuild
WORKDIR /app
COPY LockedUser.Web/package.json LockedUser.Web/yarn.lock ./
RUN yarn install
COPY LockedUser.Web/public/ public/
COPY LockedUser.Web/src/ src/
RUN yarn build

FROM node:14 as release
EXPOSE 12000
COPY --from=webbuild /app/build /lockeduser.web/build
#ENV PATH /lockeduser.api/node_modules/.bin:$PATH
COPY LockedUser.API/bin/ "/bin"
COPY LockedUser.API/yarn.lock .
COPY LockedUser.API/app.js .
COPY LockedUser.API/routes/ "/routes"
COPY LockedUser.API/public/ "/public"
COPY LockedUser.API/utility/ "utility"
COPY LockedUser.API/package.json .
RUN yarn install
CMD yarn start
