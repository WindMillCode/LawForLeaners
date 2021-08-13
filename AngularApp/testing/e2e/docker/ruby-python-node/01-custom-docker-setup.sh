# set the path
export PYENV_ROOT=/usr/local/share/pyenv
export RBENV_ROOT=/usr/local/rbenv
export NVM_DIR=/root/.nvm
export PATH=/node_modules/.bin:/node_modules:/root/.nvm/versions/node/v14.17.3/bin:/usr/local/share/pyenv/shims:/usr/local/share/pyenv/bin:/root/.nvm:/usr/local/rbenv/bin:/usr/local/rbenv/shims:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/local/share/pyenv/shims:/usr/local/share/pyenv/bin:/usr/local/rbenv/shims:/usr/local/rbenv/bin:/.nvm:/usr/local/rbenv/bin:/usr/local/rbenv/shims:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

eval "$(pyenv init --path)"
eval "$(pyenv init -)"


[ -s "$NVM_DIR/nvm.sh" ]
. $NVM_DIR/nvm.sh
