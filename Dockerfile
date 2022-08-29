FROM jekyll/jekyll AS jekyll-build
ENV JEKYLL_ENV=production
WORKDIR /srv/jekyll
COPY --chown=jekyll:jekyll . .
RUN bundle install
RUN bundle exec jekyll build

FROM node:16-alpine AS node-build
COPY . .
RUN npm install
COPY --from=jekyll-build /srv/jekyll/_site ./_site
RUN npm run finalize-css

FROM node:16-alpine
RUN mkdir mysite
WORKDIR mysite
RUN npm install http-server -g
COPY --from=node-build ./_site .
EXPOSE 4000
CMD ["http-server", ".", "-p", "4000"]
