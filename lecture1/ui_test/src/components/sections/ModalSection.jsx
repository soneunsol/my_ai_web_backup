import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import Grid from '@mui/material/Grid';

/**
 * ModalSection 컴포넌트
 *
 * MUI Dialog 컴포넌트를 사용한 모달
 * - 열기/닫기 버튼
 * - DialogTitle, DialogContent, DialogActions 구조
 * - 배경 클릭으로 닫기 가능
 */
function ModalSection() {
  const [openBasic, setOpenBasic] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [confirmResult, setConfirmResult] = useState('');

  // 기본 모달
  const handleOpenBasic = () => {
    setOpenBasic(true);
  };

  const handleCloseBasic = () => {
    setOpenBasic(false);
  };

  // 확인 모달
  const handleOpenConfirm = () => {
    setOpenConfirm(true);
    setConfirmResult('');
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleConfirmYes = () => {
    setConfirmResult('예를 선택하셨습니다!');
    setOpenConfirm(false);
  };

  const handleConfirmNo = () => {
    setConfirmResult('아니오를 선택하셨습니다!');
    setOpenConfirm(false);
  };

  // 폼 모달
  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  return (
    <Box sx={{
      bgcolor: 'white',
      borderRadius: 2,
      boxShadow: 1,
      p: { xs: 3, md: 4 }
    }}>
      {/* 섹션 제목 */}
      <Typography
        variant="h4"
        component="h2"
        sx={{
          mb: 4,
          fontWeight: 'bold',
          fontSize: { xs: '1.5rem', md: '2rem' }
        }}
      >
        Modal Components (Dialog)
      </Typography>

      {/* 기본 모달 */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            color: 'text.secondary',
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}
        >
          기본 모달 (Basic Modal)
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Button
              variant="contained"
              onClick={handleOpenBasic}
              fullWidth
            >
              기본 모달 열기
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{
              p: 2,
              bgcolor: '#f5f5f5',
              borderRadius: 1,
              minHeight: '60px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                배경 클릭 또는 닫기 버튼으로 모달을 닫을 수 있습니다.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* 기본 모달 Dialog */}
        <Dialog
          open={openBasic}
          onClose={handleCloseBasic}
        >
          <DialogTitle>기본 모달 제목</DialogTitle>
          <DialogContent>
            <DialogContentText>
              이것은 기본 모달입니다. MUI Dialog 컴포넌트를 사용하여 만들어졌습니다.
              배경을 클릭하거나 닫기 버튼을 눌러 모달을 닫을 수 있습니다.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseBasic}>닫기</Button>
          </DialogActions>
        </Dialog>
      </Box>

      {/* 확인 모달 */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            color: 'text.secondary',
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}
        >
          확인 모달 (Confirm Modal)
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleOpenConfirm}
              fullWidth
            >
              확인 모달 열기
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{
              p: 2,
              bgcolor: '#f5f5f5',
              borderRadius: 1,
              minHeight: '60px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Typography variant="body1">
                선택 결과: <strong>{confirmResult || '(선택 안 함)'}</strong>
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* 확인 모달 Dialog */}
        <Dialog
          open={openConfirm}
          onClose={handleCloseConfirm}
        >
          <DialogTitle>확인이 필요합니다</DialogTitle>
          <DialogContent>
            <DialogContentText>
              정말로 이 작업을 진행하시겠습니까?
              선택한 결과가 오른쪽 박스에 표시됩니다.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmNo} color="inherit">
              아니오
            </Button>
            <Button onClick={handleConfirmYes} variant="contained">
              예
            </Button>
          </DialogActions>
        </Dialog>
      </Box>

      {/* 폼 모달 */}
      <Box>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            color: 'text.secondary',
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}
        >
          폼 모달 (Form Modal)
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Button
              variant="outlined"
              color="success"
              onClick={handleOpenForm}
              fullWidth
            >
              폼 모달 열기
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{
              p: 2,
              bgcolor: '#f5f5f5',
              borderRadius: 1,
              minHeight: '60px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                모달 내부에 폼이나 복잡한 컨텐츠를 넣을 수 있습니다.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* 폼 모달 Dialog */}
        <Dialog
          open={openForm}
          onClose={handleCloseForm}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>사용자 정보 입력</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              아래 정보를 입력해주세요.
            </DialogContentText>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
                  이름
                </Typography>
                <Box sx={{
                  p: 1.5,
                  border: '1px solid #ccc',
                  borderRadius: 1,
                  bgcolor: '#fafafa'
                }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    입력 필드 (예시)
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
                  이메일
                </Typography>
                <Box sx={{
                  p: 1.5,
                  border: '1px solid #ccc',
                  borderRadius: 1,
                  bgcolor: '#fafafa'
                }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    입력 필드 (예시)
                  </Typography>
                </Box>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseForm} color="inherit">
              취소
            </Button>
            <Button onClick={handleCloseForm} variant="contained" color="success">
              저장
            </Button>
          </DialogActions>
        </Dialog>
      </Box>

      {/* 추가 설명 */}
      <Box sx={{
        mt: 4,
        p: 2,
        bgcolor: '#e3f2fd',
        borderRadius: 1
      }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
          💡 <strong>Dialog 컴포넌트 구조:</strong>
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 3 }}>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>DialogTitle</strong>: 모달 제목
          </Typography>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>DialogContent</strong>: 모달 내용
          </Typography>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>DialogActions</strong>: 버튼 영역
          </Typography>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>onClose</strong>: 배경 클릭 시 호출되는 함수
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ModalSection;
