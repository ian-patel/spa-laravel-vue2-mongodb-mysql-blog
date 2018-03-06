FROM php:7.1-fpm-alpine

# Get building dependencies for php extensions
RUN apk add --no-cache --virtual .run-deps \
    git \
    zlib \
    libmcrypt \
    libxml2 \
  && apk add --no-cache --virtual .build-deps \
    # nproc
    coreutils \
    # zlib ext-zip
    zlib-dev \
    libmcrypt-dev \
    libxml2-dev

RUN apk --no-cache add pcre-dev ${PHPIZE_DEPS} \ 
  && pecl install xdebug \
  && docker-php-ext-enable xdebug 

RUN apk add --update --no-cache autoconf

RUN pecl install mongodb
  # RUN echo "extension=mongodb.so" >> /usr/local/etc/php/conf.d/mongodb.ini

# Get php extensions
RUN docker-php-source extract \
  && git clone https://github.com/tideways/php-profiler-extension.git --depth=1 /usr/src/php/ext/tideways \
  && docker-php-ext-install -j$(nproc) \
    zip \
    mcrypt \
    mysqli \
    pdo_mysql \
    soap \
    mbstring \
    opcache \
    tideways \
  && docker-php-source delete \
  && docker-php-ext-enable mongodb \
  && apk del .build-deps
  && apk del pcre-dev ${PHPIZE_DEPS}

# Get composer into /usr/local/bin/composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
# Setup a github token for composer, because github API rate limit
# Token is generatered from https://github.com/settings/tokens
RUN composer config -g github-oauth.github.com e84b43eac402c04f0a42fbd5d5ab8953399e4d8f
